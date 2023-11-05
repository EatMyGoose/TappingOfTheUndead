import Konva from 'konva';

//In world space, 
//y = -1: top of screen
//y = 1: bottom of screen
//aspect ratio is 1:1
//left & right x are dependent on the aspect ratio
export function GetWorld2ClientXForm(
    clientWidth: number, 
    clientHeight: number,
    worldXoffset: number,
    worldYoffset: number) : Konva.Transform
{
  const xForm = new Konva.Transform();
  const scale = clientHeight / 2;

  xForm.translate(clientWidth / 2, clientHeight / 2);
  xForm.scale(scale, scale);
  xForm.translate(worldXoffset, worldYoffset);
  
  return xForm;
}

const rad2Deg: number = Math.PI / 180;
export function ApplyTransform(
    world2Client: Konva.Transform,
    worldX: number, 
    worldY: number, 
    worldWidth: number = 0,
    worldHeight: number = 0,
    worldRotationDeg: number = 0)
{
    const worldSpaceTranslation = new Konva.Transform();

    worldSpaceTranslation.translate(worldX, worldY);
    worldSpaceTranslation.translate(worldWidth / 2, worldHeight / 2);
    worldSpaceTranslation.rotate(worldRotationDeg * rad2Deg);
    worldSpaceTranslation.translate(-worldWidth / 2, -worldHeight / 2);

    const xform = world2Client.copy().multiply(worldSpaceTranslation);

    return xform.decompose();
}

export function TryIndex<T>(arr: T[], index: number) : T | undefined
{
  if(!Number.isInteger(index) || index < 0 || index >= arr.length) return undefined;

  return arr[index];
}

export function MinElementIndex<T>(arr: T[], scoreFunc: (elem: T) => number) : number
{
  if(arr.length === 0) return -1;

  let minIndex = 0;
  let minScore = scoreFunc(arr[0]);

  for(let i = 1; i < arr.length; i++)
  {
    const score = scoreFunc(arr[i]);
    if(score < minScore)
    {
      minIndex = i;
      minScore = score;
    }
  }

  return minIndex;
}

export function Normalize(x: number, y: number) : [number, number]
{
  const denominator = Math.hypot(x, y);
  if(denominator === 0) return [0,0];

  return [x / denominator, y / denominator];
}

export function CosineSimilarity(x1: number, y1:number, x2: number, y2:number,) : number
{
  const dotProduct: number = (x1 * x2) + (y1 * y2);
  const normProduct: number = Math.hypot(x1, y1) * Math.hypot(x2, y2);

  if(normProduct === 0) return 0;

  return dotProduct / normProduct;
}

export function CappedFrac(upper: number, value: number) : number
{
  return Math.min(1, value / upper);
} 

//requirements: x2 > x1
export function CappedLerp(
  y1 : number, x1 : number, 
  y2 : number, x2 : number, x : number) : number
{
  if(x < x1) return y1;
  if(x > x2) return y2;

  const frac = (x - x1) / (x2 - x1);
  return frac * y2 + (1 - frac) * y1;
}


export function GetGridCoord(width: number, height: number, row: number, col: number) : [number,number, number,number]
{
    const x = col * width;
    const y = row * height;
    return [x, y, width, height];
} 