// /js/embed-iframe-content.js

(function(){
    // Note the id, we need to set this correctly on the script tag responsible for
    // requesting this file.
    var me = document.getElementById('my-iframe-content-loader-script-tag');

    function loadIFrame() {
        var ifrm = document.createElement('iframe');
        ifrm.id = 'my-iframe-identifier';
        ifrm.setAttribute('src', 'http://www.google.com');
        ifrm.style.width = '100%';
        ifrm.style.border = 0;
        // we initially hide the iframe to avoid seeing the iframe resizing
        ifrm.style.opacity = 0;
        ifrm.onload = function () {
            // this will resize our iframe
            iFrameResize({ log: true }, '#my-iframe-identifier');
            // make our iframe visible
            ifrm.style.opacity = 1;
        };

        me.insertAdjacentElement('afterend', ifrm);
    }

    if (!window.iFrameResize) {
        // We first need to ensure we inject the js required to resize our iframe.

        var resizerScriptTag = document.createElement('script');
        resizerScriptTag.type = 'text/javascript';

        // IMPORTANT: insert the script tag before attaching the onload and setting the src.
        me.insertAdjacentElement('afterend', ifrm);

        // IMPORTANT: attach the onload before setting the src.
        resizerScriptTag.onload = loadIFrame;

        // This a CDN resource to get the iFrameResizer code.
        // NOTE: You must have the below "coupled" script hosted by the content that
        // is loaded within the iframe:
        // https://unpkg.com/iframe-resizer@3.5.14/js/iframeResizer.contentWindow.min.js
        resizerScriptTag.src = 'https://unpkg.com/iframe-resizer@3.5.14/js/iframeResizer.min.js';
    } else {
        // Cool, the iFrameResizer exists so we can just load our iframe.
        loadIFrame();
    }    
}())
