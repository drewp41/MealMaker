export interface PointType {
    readonly x: number;
    readonly y: number;
}
export default class BBox {
    readonly x: number;
    readonly y: number;
    readonly height: number;
    readonly width: number;
    static fromBBoxObject(bbox: any): BBox;
    static fromRange(minX: number, minY: number, maxX: number, maxY: number): BBox;
    constructor(x?: number, y?: number, width?: number, height?: number);
    equals(bbox: BBox): boolean;
    get minX(): number;
    get maxX(): number;
    get minY(): number;
    get maxY(): number;
    get tl(): {
        x: number;
        y: number;
    };
    get tr(): {
        x: number;
        y: number;
    };
    get bl(): {
        x: number;
        y: number;
    };
    get br(): {
        x: number;
        y: number;
    };
}
