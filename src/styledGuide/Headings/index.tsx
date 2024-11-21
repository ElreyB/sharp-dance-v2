import React from 'react';
import useFitText from 'use-fit-text';

function fitWrapper(
  Component: keyof JSX.IntrinsicElements,
  maxFontSize: number
) {
  const Headers: React.FC<{
    children?: React.ReactNode;
    noResize?: boolean;
    [key: string]: any;
  }> = ({ children, noResize, ...props }) => {
    const { fontSize, ref: fitTextRef } = useFitText({
      maxFontSize,
      minFontSize: 10,
    });

    React.useEffect(() => {
      if (children && !noResize) {
        // Trigger fitTextRef updates when content or noResize changes
        fitTextRef.current?.getBoundingClientRect();
      }
    }, [children, noResize, fitTextRef]);

    return (
      <div ref={fitTextRef} style={{ fontSize }} {...props}>
        {children && <div>{children}</div>}
      </div>
    );
  };

  Headers.displayName = Component;
  return Headers;
}

// Exporting the wrapped headers
export const H1 = fitWrapper('h1', 18);
export const H2 = fitWrapper('h2', 16);
export const H3 = fitWrapper('h3', 15);
export const H4 = fitWrapper('h4', 14);
