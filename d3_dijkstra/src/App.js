/**
 * Dijkstra with D3 force layout and ReactJS
 * 
 * TODO
 * Why does graph freak out at the beginning?
 * Grab nodes
 * Show weights
 * 
 * Inspiration from:
 * http://bl.ocks.org/sxywu/61a4bd0cfc373cf08884
 */

import React, { Component } from 'react';
import './App.css';

import {getNodes, run} from './dijkstra';

// TODO: move this into the Graph component so it can be reused

// D3 layout settings
let width = 800,
  height = 400,
  radius = 16;

/**
 * Force graph (the main D3 stuff)
 */
class Graph extends Component {

   constructor(props) {
    super(props);
     
    // D3 force layout
    this.force = window.d3.layout.force()
      .size([width, height])
      .linkDistance(50)
      .charge(-300);
      //.chargeDistance(700)
      //.gravity(.007);
   }

  /**
   * When the component mounts, do D3 setup
   * 
   * TODO: componentWillUnmount?
   */
  componentWillMount() {
    this.force.on('tick', () => {
      this.forceUpdate();
    });
  }

  /**
   * When we pass in new nodes and links via props
   */
  componentWillReceiveProps(nextProps) {
    // Set the force nodes and links
    this.force
      .nodes(nextProps.nodes)
      .links(nextProps.links);

    this.force.start();
  }

  /**
   * Find the path and highlight
   */
  findPath() {
    let from = document.querySelector('#nodeFrom').value.trim();
    let to = document.querySelector('#nodeTo').value.trim();

    if (from === '' || to === '') {
      alert('Must specify from and to nodes!');
      return;
    }

    let [path, dist] = run(from, to);

    /*
    console.log(path);
    console.log(dist);
    */

    /**
     * Return true if a link key is on the path
     */
    function inPath(linkKey) {
      for (let i = 1; i < path.length; i++) {
        if (linkKey === path[i-1] + ',' + path[i] || linkKey === path[i] + ',' + path[i-1]) {
          return true;
        }
      }
      return false;
    }

    // Set the ones that are on the path
    let allLineElems = document.querySelectorAll('line');
    for (let elem of allLineElems) {
      let linkKey = elem.getAttribute('linkkey');

      if (inPath(linkKey)) {
        elem.classList.add('link-path');
      } else {
        elem.classList.remove('link-path');
      }
    }

  }

  /**
   * Show me the money
   */
  render() {
    // Build a list of nodes (the circles/cities)
    let nodes = this.props.nodes.map(node => {
      let transform = 'translate(' + node.x + ',' + node.y +  ')';
      return (
        <g className='node' key={node.key} transform={transform}>
           <circle r={radius} />
           <text>{node.key}</text>
        </g>
      );
    });

    // Build a list of links (the lines/roads)
    let links = this.props.links.map(link => {
      let dx = (link.target.px - link.source.px)/2 + link.source.px;
      let dy = (link.target.py - link.source.py)/2 + link.source.py;
      let transform = "translate(" + dx + "," + dy + ")";

      return (
        <g>
          <line className='link' key={link.key} linkkey={link.key}
            x1={link.source.x}
            x2={link.target.x}
            y1={link.source.y}
            y2={link.target.y} />
          <text className='link-text' transform={transform}>{link.label}</text>
        </g>
      );
    });
    
    // return the whole SVG thingy
    return (
      <div>
        <div>
          <input type="text" placeholder="From node" id="nodeFrom"/>
          <input type="text" placeholder="To node" id="nodeTo"/>
          <button onClick={this.findPath}>Find Path</button>
        </div>
        <svg width={width} height={height}>
          <g>
            {links}
            {nodes}
          </g>
        </svg>
      </div>
    );
  }

}

/**
 * Holder for the D3Dijkstra stuff
 */
class D3Dijkstra extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
      links: []
    };
  }

  /**
   * Load the data when the component mounts
   */
 componentDidMount() {
   this.updateData();
 }

 /**
  * Update node data
  */
 updateData() {
   let [nodes, links] = getNodes();

   this.setState({
     nodes: nodes,
     links: links
   });
 }
 
  /**
   * Render the UI and graph
   */
  render() {
    return (
      <div>
        <Graph nodes={this.state.nodes} links={this.state.links} />
      </div>
    );
  }
}

/**
 * App
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <D3Dijkstra />
      </div>
    );
  }
}

export default App;
