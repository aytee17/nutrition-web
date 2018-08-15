const range = (start, stop, step = 1) =>
    Array((stop - start) / step)
        .fill(start)
        .map((x, y) => x + y * step);

export default range;
