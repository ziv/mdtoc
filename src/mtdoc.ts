export interface MtdocLine {
    len: number;
    title: string;
    href: string;
}

export interface MtdocOptions {
    start?: number;
    depth?: number;
    format?: (line: MtdocLine) => string;
}

export function format(line: MtdocLine) {
    return ' '.repeat((line.len - 2) * 2) + `* [${line.title}](#${line.href})`;
}

export function mtdoc(content: string, opts: MtdocOptions = {}) {
    const start = opts.start || 2;
    const depth = opts.depth || 4;
    const fn = opts.format || format;
    const filter = new RegExp(`^(#{${start},${start + depth}}) (.*)`);

    return content
        .split('\n')
        .map(line => filter.exec(line.trim()))
        .filter(line => !!line)
        .map(([, header, title]) => ({
            title,
            len: header.length,
            href: title.toLowerCase().replace(/\s/g, '-')
        }))
        .map(fn)
        .join('\n');

}
