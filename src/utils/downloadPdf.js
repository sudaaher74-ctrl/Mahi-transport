import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function directDownloadPdf(elementId, filename = 'document.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  // Create an isolated sandbox element offscreen with exact A4 dimensions
  // This guarantees html2canvas is completely free of any CSS transforms, zoom, or viewport scaling
  const sandbox = document.createElement('div');
  sandbox.style.position = 'fixed';
  sandbox.style.left = '-99999px';
  sandbox.style.top = '0';
  sandbox.style.width = '794px';
  sandbox.style.minHeight = '1123px';
  sandbox.style.margin = '0';
  sandbox.style.padding = '0';
  sandbox.style.background = '#ffffff';
  sandbox.style.zIndex = '-9999';
  sandbox.style.transform = 'none';
  sandbox.style.transformOrigin = 'top left';

  // Deep clone target element
  const clone = element.cloneNode(true);
  clone.id = `${elementId}-export-clone`;
  clone.style.width = '794px';
  clone.style.maxWidth = '794px';
  clone.style.margin = '0';
  clone.style.padding = '20px';
  clone.style.transform = 'none';
  clone.style.letterSpacing = 'normal';

  sandbox.appendChild(clone);
  document.body.appendChild(sandbox);

  try {
    // Wait for fonts and all images inside clone
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const origImages = Array.from(element.querySelectorAll('img'));
    const cloneImages = Array.from(clone.querySelectorAll('img'));

    // Explicitly lock clone image dimensions from original rendered DOM
    cloneImages.forEach((img, i) => {
      const orig = origImages[i];
      if (orig) {
        const rect = orig.getBoundingClientRect();
        if (rect.width > 0) {
          img.style.width = `${rect.width}px`;
          img.style.maxWidth = `${rect.width}px`;
          img.style.minWidth = `${rect.width}px`;
        }
        if (rect.height > 0) {
          img.style.height = `${rect.height}px`;
          img.style.maxHeight = `${rect.height}px`;
        }
      }
    });

    await Promise.all(
      cloneImages.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Give a tiny tick for layout rendering
    await new Promise(r => setTimeout(r, 60));

    // High-resolution canvas capture on clean unscaled node
    const canvas = await html2canvas(clone, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      scrollX: 0,
      scrollY: 0
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Create single-page A4 document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Draw the image filling the single A4 page
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(finalFilename);
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback to window print
    window.print();
  } finally {
    if (sandbox && sandbox.parentNode) {
      sandbox.parentNode.removeChild(sandbox);
    }
  }
}
