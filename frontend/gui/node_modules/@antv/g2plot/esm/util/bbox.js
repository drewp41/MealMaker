var BBox = /** @class */ (function () {
    function BBox(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        // range
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }
    BBox.fromBBoxObject = function (bbox) {
        return new BBox(bbox.x, bbox.y, bbox.width, bbox.height);
    };
    BBox.fromRange = function (minX, minY, maxX, maxY) {
        return new BBox(minX, minY, maxX - minX, maxY - minY);
    };
    BBox.prototype.equals = function (bbox) {
        return this.x === bbox.x && this.y === bbox.y && this.width === bbox.width && this.height === bbox.height;
    };
    Object.defineProperty(BBox.prototype, "minX", {
        get: function () {
            return this.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BBox.prototype, "maxX", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BBox.prototype, "minY", {
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BBox.prototype, "maxY", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BBox.prototype, "tl", {
        get: function () {
            return { x: this.x, y: this.y };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BBox.prototype, "tr", {
        get: function () {
            return { x: this.maxX, y: this.y };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BBox.prototype, "bl", {
        get: function () {
            return { x: this.x, y: this.maxY };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BBox.prototype, "br", {
        get: function () {
            return { x: this.maxX, y: this.maxY };
        },
        enumerable: true,
        configurable: true
    });
    return BBox;
}());
export default BBox;
//# sourceMappingURL=bbox.js.map