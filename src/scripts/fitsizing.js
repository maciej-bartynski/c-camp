/*Author: Maciej Bartyński*/
/*You can use, you can edit*/

//IExplorer supported;
/** Sets fit-position and starts to listen for window resize:
fit.cover(positioned, positioner) **/
/** Sets fit-position;
fit.aToB(positioned, positioner) **/
/** Starts to listen for window resize;
fit.listen(positioned, positioner) **/
export var fit = {
    setSizeXY: function (image, space) {
        let sizeX = image.offsetWidth;
        let sizeY = image.offsetHeight;
        let ratio = sizeX / sizeY;
        space.style.boxSizing = "border-box";
        space.style.padding = 0;
        space.style.margin = 0;
        let spaceX = space.offsetWidth;
        let spaceY = space.offsetHeight;
        let spaceRatio = spaceX / spaceY;
        if (spaceRatio > ratio) {
            image.style.height = spaceY + 'px';
            image.style.width = "auto";
        } else if (spaceRatio < ratio) {
            image.style.width = spaceX + 'px';
            image.style.height = "auto";
        } else if (spaceRatio === ratio) {
            image.style.height = spaceY + 'px';
            image.style.width = "auto";
        }
    },
    aToB: function (a, b) {
        this.setSizeXY(a, b);
    },
    listen: function (a, b) {
        this.setSizeXY(a, b);
        window.addEventListener('resize', function () {
            fit.setSizeXY(a, b);
        });
    },
    cover: function (a, b) {
        this.setSizeXY(a, b);
        this.listen(a, b);
    }
}