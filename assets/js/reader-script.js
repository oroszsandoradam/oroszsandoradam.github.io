      // Itt van a teljes JavaScript kód...
      document.addEventListener('DOMContentLoaded', function() {
        const content = document.getElementById('content');
        const tocContainer = document.getElementById('toc');

        // ----- EZT A SORT MÓDOSÍTOTTUK -----
        const headers = content.querySelectorAll("h1, h2, h3");

        if (headers.length > 0) {
          headers.forEach(h => {
            const link = document.createElement("a");
            const id = h.textContent.trim().replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
            h.id = id;
            link.href = "#" + id;
            link.textContent = h.textContent;

            // Hierarchia stílusok
            if(h.tagName === 'H2') {
              link.classList.add('level-h2'); // Opcionális, de szép lehet
            }
            if(h.tagName === 'H3') {
              link.classList.add('level-h3');
            }

            tocContainer.appendChild(link);
          });
        } else {
          tocContainer.innerHTML = '<p>Nincsenek fejezetcímek.</p>';
          document.getElementById('toggle-toc').style.display = 'none';
        }

        // A kód többi része változatlan...
        const toggleButton = document.getElementById('toggle-toc');
        toggleButton.addEventListener('click', function() { tocContainer.classList.toggle('open'); });
        tocContainer.addEventListener('click', function(e) { if (e.target.tagName === 'A') { tocContainer.classList.remove('open'); } });
        const increaseFontBtn = document.getElementById('increase-font');
        const decreaseFontBtn = document.getElementById('decrease-font');
        let currentFontSize = 110;
        increaseFontBtn.addEventListener('click', function() { if (currentFontSize < 200) { currentFontSize += 10; content.style.fontSize = currentFontSize + '%'; } });
        decreaseFontBtn.addEventListener('click', function() { if (currentFontSize > 70) { currentFontSize -= 10; content.style.fontSize = currentFontSize + '%'; } });
      });
