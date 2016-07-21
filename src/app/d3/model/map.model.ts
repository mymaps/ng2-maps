export class Layer {
  id: string;
  type: string;
  rank: number;
  name: string;
  applied: boolean;
  visible: boolean;
  maps:Map[];
}

// Graticule layer

export class GraticuleLayerDisplay {
  background: boolean;
  lines: boolean;
  borders: boolean;
}

export class GraticuleLayerStyles {
  background: { fill: string };
  borders: { stroke: string, strokeWidth: string };
  lines: { stroke: string, strokeWidth: string, strokeOpacity: string };
}

export class GraticuleLayer extends Layer {
  display: GraticuleLayerDisplay;
  styles: GraticuleLayerStyles;
}

// Geo data layer

export class GeodataLayerStyles {
  background: { fill: string };
  lines: { stroke: string, strokeWidth: string, strokeOpacity: string };
}

export class GeodataLayerDisplay {
  fill: { categorical: any };
}

export class GeodataLayerData {
  url: string;
  type: string;
}

export class GeodataLayer extends Layer {
  data: GeodataLayerData;
  display: GeodataLayerDisplay;
  styles: GeodataLayerStyles;
}

// Shape layer

export class ShapeCircleLayerStyles {
  background: { fill: string, opacity: string };
  lines: { stroke: string, strokeWidth: string, strokeOpacity: string };
}

export class ShapeCircleLayerDisplay {
  shape: { type: string, originExpr: string, radius: string, radiusExpr: string, opacity: string }
}

export class ShapeCircleLayerData {
  url: string;
  type: string;
}

export class ShapeCircleLayer extends Layer {
  data: ShapeCircleLayerData;
  display: ShapeCircleLayerDisplay;
  styles: ShapeCircleLayerStyles;
}

export class ShapePointLayerStyles {
  background: { fill: string, opacity: string };
  lines: { stroke: string, strokeWidth: string, strokeOpacity: string };
}

export class ShapePointLayerDisplay {
  shape: { type: string, originExpr: string, radius: string, radiusExpr: string, opacity: string }
}

export class ShapePointLayer extends Layer {
  display: ShapePointLayerDisplay;
  styles: ShapePointLayerStyles;
}

// Map

export class Map {
  id: string;
  name: string;
  layers: Layer[];
}