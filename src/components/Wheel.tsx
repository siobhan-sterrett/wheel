import React from 'react';
import { Sector } from './Sector';

export type WheelProps = {
    sectors: string[];
    grads: number;
    width: number;
    height: number;
}

export const Wheel = (props: WheelProps) => {
    const ref = React.createRef<SVGSVGElement>();
    const innerWidth = 240;
    const innerHeight = 240;

    const viewBox = [
        -innerWidth / 2, -innerHeight / 2,
        innerWidth, innerHeight
    ].join(' ');

    const withMousePos = <T extends {}>(cbk: (pt: { x: number, y: number }) => T) =>
        (e: React.MouseEvent<SVGElement>) => {
            const svg = ref.current;
            if (svg) {
                let pt = svg.createSVGPoint();
                pt.x = e.clientX; pt.y = e.clientY;
                pt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
                return cbk(pt);
            }
        }

    const makeSector = (title: string, idx: number) =>
        <g key={title}transform={`rotate(${idx * 360 / props.sectors.length})`}>
            <Sector 
                title={title}
                arc={1 / props.sectors.length}
                grads={props.grads}
                withMousePos={withMousePos}
            />
        </g>

    return (
        <svg ref={ref} viewBox={viewBox} width={props.width} height={props.height}>
            {props.sectors.map(makeSector)}
        </svg>
    );
}