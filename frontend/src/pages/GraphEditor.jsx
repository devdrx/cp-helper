// src/components/GraphEditor.jsx
import React, { useState, useRef, useContext } from "react";
import * as d3 from "d3";
import { DarkModeContext } from "../App";

export default function GraphEditor() {
  const { darkMode } = useContext(DarkModeContext);
  const [nodeCount, setNodeCount] = useState("");
  const [graphData, setGraphData] = useState("");
  const [isDirected, setIsDirected] = useState(false);
  const svgRef = useRef();

  const handleDraw = () => {
    const edges = graphData
      .trim()
      .split("\n")
      .map(line => line.trim().split(" ").map(Number))
      .filter(arr => arr.length === 2);

    const nodes = Array.from({ length: Number(nodeCount) }, (_, i) => ({ id: i }));
    const links = edges.map(([u, v]) => ({ source: u, target: v }));

    drawGraph(nodes, links, isDirected);
  };

  const drawGraph = (nodes, links, directed) => {
    const svgEl = d3.select(svgRef.current);
    const bbox = svgRef.current.getBoundingClientRect();
    const width = bbox.width;
    const height = bbox.height;
    const margin = 50;

    svgEl.selectAll("*").remove();
    svgEl.attr("viewBox", `0 0 ${width} ${height}`);

    // Random initial positions within inner area
    nodes.forEach(n => {
      n.x = margin + Math.random() * (width - 2 * margin);
      n.y = margin + Math.random() * (height - 2 * margin);
    });

    // Define arrowhead if directed
    if (directed) {
      const defs = svgEl.append("defs");
      defs.append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#aaa");
    }

    const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("link", d3.forceLink(links).id(d => d.id).distance(100).strength(0.1))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const link = svgEl.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2)
      .attr("marker-end", d => directed ? "url(#arrowhead)" : "");

    const node = svgEl.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 20)
      .attr("fill", "steelblue")
      .call(d3.drag()
        .on("start", dragStart)
        .on("drag", dragging)
        .on("end", dragEnd)
      );

    const text = svgEl.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text(d => d.id)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em");

    function ticked() {
      nodes.forEach(d => {
        d.x = Math.max(margin, Math.min(width - margin, d.x));
        d.y = Math.max(margin, Math.min(height - margin, d.y));
      });

      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x).attr("cy", d => d.y);
      text.attr("x", d => d.x).attr("y", d => d.y);
    }

    function dragStart(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragging(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnd(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left – Form */}
      <div
        className={`
          lg:w-1/2 rounded-2xl p-6 flex flex-col shadow
          border ${darkMode ? "border-gray-700" : "border-gray-300"}
          ${darkMode ? "bg-gray-800"    : "bg-white"}
        `}
      >
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Graph Editor
        </h2>

        <div className="pt-2">
          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Node Count
          </label>
          <input
            type="number"
            value={nodeCount}
            onChange={e => setNodeCount(e.target.value)}
            placeholder="e.g., 6"
            className={`
              w-full px-3 py-2 rounded-lg
              border ${darkMode ? "border-gray-600" : "border-gray-300"}
              ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"}
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
        </div>

        <div className="flex flex-col flex-1 pt-4">
          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Graph Data (edges)
          </label>
          <textarea
            rows={6}
            value={graphData}
            onChange={e => setGraphData(e.target.value)}
            placeholder={`0 2\n0 4\n0 5\n1 4\n1 5\n2 3\n2 4\n4 5`}
            className={`
              flex-1 w-full px-3 py-2 rounded-lg
              border ${darkMode ? "border-gray-600" : "border-gray-300"}
              ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"}
              focus:outline-none focus:ring-2 focus:ring-blue-500
              resize-none overflow-auto
            `}
          />
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <input
            type="checkbox"
            checked={isDirected}
            onChange={() => setIsDirected(!isDirected)}
            className="accent-blue-500"
          />
          <label className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Directed Graph
          </label>
        </div>

        <button
          onClick={handleDraw}
          className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Draw Graph
        </button>
      </div>

      {/* Right – Graph Canvas */}
      <div
        className={`
          lg:w-1/2 rounded-2xl p-4 shadow
          border ${darkMode ? "border-gray-600" : "border-gray-300"}
          ${darkMode ? "bg-gray-900"    : "bg-white"}
        `}
      >
        <svg
          ref={svgRef}
          className={`
            w-full h-[600px] rounded-xl
            border ${darkMode ? "border-gray-700" : "border-gray-200"}
          `}
        />
      </div>
    </div>
  );
}
