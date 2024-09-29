const selectedUnicode = (() => {
    /**
    * Uses canvas.measureText to compute and return the metrics of the given text of given font in pixels.
    * 
    * @param {String} text The text to be rendered.
    * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
    * 
    * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
    */
    function getTextMetrics(text, font) {
      // re-use canvas object for better performance
      const canvas = getTextMetrics.canvas || (getTextMetrics.canvas = document.createElement("canvas"));
      const context = canvas.getContext("2d");
      context.font = font;
      return context.measureText(text);
    }

    function getCssStyle(element, prop) {
        return window.getComputedStyle(element, null).getPropertyValue(prop);
    }

    function getCanvasFont(el = document.body) {
      const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
      const fontSize = getCssStyle(el, 'font-size') || '16px';
      const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
      
      return `${fontWeight} ${fontSize} ${fontFamily}`;
    }

    
    const setup = ({
        root,
        chars
    }) => {
        chars.sort();

        const testpre = document.createElement("pre");
        root.appendChild(testpre);
        const font = getCanvasFont(testpre);
        root.removeChild(testpre);

        const baseMargin = 24;

        for (c of chars) {
            const pre = document.createElement("pre");

            const metrics = getTextMetrics(c, font);
            const width = metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft;

            pre.textContent = `${c} | U+${c.codePointAt(0).toString(16).toUpperCase()}`;
            pre.style.marginTop = '0';
            pre.style.marginBottom = '0';
            pre.style.marginLeft = `${ baseMargin - width }px`;

            root.appendChild(pre);
        }
    }

    return { setup }
})()

