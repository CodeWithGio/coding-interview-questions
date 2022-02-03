class Solution {

    dfs(
        graph: Map<number, Array<number>>, 
        visited: Map<number, boolean>,
        node: number
    ) {
        visited.set(node, true);

        graph.get(node).forEach(childNode => {
            if (!visited.get(childNode)) this.dfs(graph, visited, childNode)
        });
    }

    solve(matrix: Array<Array<number>>): number {
        const graph = new Map<number, Array<number> >();
        const visited = new Map<number, boolean>();
        const rows = new Map<number, number>();
        const cols = new Map<number, number>();

        let currentPointIndex;
        
        matrix.forEach((row, rowIndex) => {
            row.forEach((val, colIndex) => {
                if (val === 1) {
                    currentPointIndex = graph.size;
                    graph.set(currentPointIndex, []);
                    visited.set(currentPointIndex, false);

                    if (rows.has(rowIndex)) {
                        graph.get(currentPointIndex).push(rows.get(rowIndex));
                        graph.get(rows.get(rowIndex)).push(currentPointIndex);
                    }
                    if (cols.has(colIndex)) {
                        graph.get(currentPointIndex).push(cols.get(colIndex));
                        graph.get(cols.get(colIndex)).push(currentPointIndex);
                    }
                    
                    rows.set(rowIndex, currentPointIndex);
                    cols.set(colIndex, currentPointIndex);
                }
            });
        });

        let ans = 0;

        for (let node=0; node < graph.size; node++) {
            if (!visited.get(node)) {
                ans++;
                this.dfs(graph, visited, node);
            }
        }

        return ans;
    }
}
