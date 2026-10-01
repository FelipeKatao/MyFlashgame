/**
 * PDF Export Module for MyFlashGame
 * Exports selected Flashcards to printable grid PDF format
 */

class ExportManager {
  constructor() {
    this.selectedType = 'both'; // 'both', 'questions', 'answers'
    this.selectedCategory = 'Todas';
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    const typeSelect = document.getElementById('export-type-select');
    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        this.selectedType = e.target.value;
        this.renderPreview();
      });
    }

    const categorySelect = document.getElementById('export-category-select');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.selectedCategory = e.target.value;
        this.renderPreview();
      });
    }

    const btnExportPdf = document.getElementById('btn-generate-pdf');
    if (btnExportPdf) {
      btnExportPdf.addEventListener('click', () => {
        this.generatePDF();
      });
    }

    const btnPrintWindow = document.getElementById('btn-print-cards');
    if (btnPrintWindow) {
      btnPrintWindow.addEventListener('click', () => {
        window.print();
      });
    }
  }

  render() {
    this.populateCategories();
    this.renderPreview();
  }

  populateCategories() {
    const categories = window.storage.data.categories || [];
    const select = document.getElementById('export-category-select');
    if (!select) return;

    let html = `<option value="Todas">Todas as Matérias</option>`;
    categories.forEach(cat => {
      html += `<option value="${cat}" ${this.selectedCategory === cat ? 'selected' : ''}>${cat}</option>`;
    });

    select.innerHTML = html;
  }

  getFilteredCards() {
    return window.storage.getCards(this.selectedCategory);
  }

  renderPreview() {
    const previewContainer = document.getElementById('export-preview-grid');
    if (!previewContainer) return;

    const cards = this.getFilteredCards();

    if (cards.length === 0) {
      previewContainer.innerHTML = `
        <div class="col-span-full py-10 text-center text-slate-500 font-semibold">
          Nenhum flashcard disponível para exportação na matéria selecionada.
        </div>
      `;
      return;
    }

    let html = '';
    cards.forEach((card, index) => {
      html += `
        <div class="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-4 shadow-sm relative flex flex-col justify-between break-inside-avoid">
          <div class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md">
            #${index + 1} | ${this.escapeHtml(card.category)}
          </div>
      `;

      if (this.selectedType === 'both' || this.selectedType === 'questions') {
        html += `
          <div class="mb-3">
            <span class="text-[11px] uppercase tracking-wider font-extrabold text-orange-600">Pergunta:</span>
            <p class="font-bold text-slate-800 text-sm mt-0.5">${this.escapeHtml(card.question)}</p>
          </div>
        `;
      }

      if (this.selectedType === 'both') {
        html += `<hr class="border-amber-200/80 my-2">`;
      }

      if (this.selectedType === 'both' || this.selectedType === 'answers') {
        html += `
          <div>
            <span class="text-[11px] uppercase tracking-wider font-extrabold text-amber-700">Resposta:</span>
            <p class="text-slate-700 text-sm mt-0.5">${this.escapeHtml(card.answer)}</p>
          </div>
        `;
      }

      html += `</div>`;
    });

    previewContainer.innerHTML = html;
  }

  async generatePDF() {
    const cards = this.getFilteredCards();
    if (cards.length === 0) {
      alert('Não há flashcards para exportar nesta seleção.');
      return;
    }

    if (window.app) window.app.showNotification("Gerando PDF dos Flashcards...");

    // Check if jsPDF library is available
    if (window.jspdf && window.jspdf.jsPDF) {
      try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 15;
        const gap = 10;
        const cols = 2;
        const cardWidth = (pageWidth - (margin * 2) - gap) / cols;
        const cardHeight = 45;

        let x = margin;
        let y = 25;

        // Title Header
        doc.setFillColor(245, 158, 11); // Amber 500
        doc.rect(0, 0, pageWidth, 16, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`My Flashcards - ${this.selectedCategory}`, margin, 11);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Exportado por: ${window.storage.data.playerName || 'Aluno'} | Data: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - margin, 11, { align: 'right' });

        cards.forEach((card, i) => {
          // Check page break
          if (y + cardHeight > 280) {
            doc.addPage();
            y = 20;

            // Re-render Header
            doc.setFillColor(245, 158, 11);
            doc.rect(0, 0, pageWidth, 16, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(`My Flashcards - ${this.selectedCategory}`, margin, 11);
          }

          // Card Box Background
          doc.setFillColor(254, 243, 199); // Amber 100
          doc.setDrawColor(245, 158, 11); // Amber 500
          doc.setLineWidth(0.6);
          doc.roundedRect(x, y, cardWidth, cardHeight, 3, 3, 'FD');

          // Header inside card
          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(234, 88, 12); // Orange 600
          doc.text(`#${i + 1} - ${card.category}`, x + 4, y + 6);

          let currentY = y + 12;

          // Question
          if (this.selectedType === 'both' || this.selectedType === 'questions') {
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(120, 53, 15);
            doc.text("P: ", x + 4, currentY);

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(30, 41, 59);
            const qLines = doc.splitTextToSize(card.question, cardWidth - 14);
            doc.text(qLines, x + 9, currentY);
            currentY += (qLines.length * 4) + 3;
          }

          // Answer
          if (this.selectedType === 'both' || this.selectedType === 'answers') {
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(180, 83, 9);
            doc.text("R: ", x + 4, currentY);

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(51, 65, 85);
            const aLines = doc.splitTextToSize(card.answer, cardWidth - 14);
            doc.text(aLines, x + 9, currentY);
          }

          // Grid coordinates increment
          if (i % 2 === 0) {
            x = margin + cardWidth + gap;
          } else {
            x = margin;
            y += cardHeight + gap;
          }
        });

        doc.save(`Flashcards_${this.selectedCategory}_${Date.now()}.pdf`);
        if (window.app) window.app.showNotification("PDF baixado com sucesso!");
        return;
      } catch (err) {
        console.error("jsPDF generation error:", err);
      }
    }

    // Fallback printable view
    window.print();
  }

  escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.exportManager = new ExportManager();
