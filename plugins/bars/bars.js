"use strict";

(function () {
  /*
   * Federated Wiki : Bars Plugin
   *
   * Licensed under the MIT license.
   * https://github.com/fedwiki/wiki-plugin-bars/blob/master/LICENSE.txt
   */
  window.plugins.bars = {
    bind: function bind(div, item) {},
    emit: function emit(div, item) {
      return wiki.getScript('/js/d3/d3.min.js', function () {
        var bars, data, h, rules, vis, w, x, y;

        data = function () {
          var j, len, ref, results;
          ref = wiki.getData();
          results = [];

          for (j = 0, len = ref.length; j < len; j += 5) {
            x = ref[j];
            results.push(x[1] / 100.0);
          }

          return results;
        }();

        w = 380;
        h = 230;
        x = d3.scale.linear().domain([0, 1]).range([0, w]);
        y = d3.scale.ordinal().domain(d3.range(data.length)).rangeBands([0, h], .2);
        vis = d3.select(div.get(0)).append("svg:svg").attr("width", w + 40).attr("height", h + 30).append("svg:g").attr("transform", "translate(20,0)");
        bars = vis.selectAll("g.bar").data(data).enter().append("svg:g").attr("class", "bar").attr("transform", function (d, i) {
          return "translate(0,".concat(y(i), ")");
        });
        bars.append("svg:rect").attr("fill", "steelblue").attr("width", x).attr("height", y.rangeBand());
        bars.append("svg:text").attr("x", x).attr("y", y.rangeBand() / 2).attr("dx", -6).attr("dy", ".35em").attr("fill", "white").attr("text-anchor", "end").text(x.tickFormat(100));
        bars.append("svg:text").attr("x", 0).attr("y", y.rangeBand() / 2).attr("dx", -6).attr("dy", ".35em").attr("text-anchor", "end").text(function (d, i) {
          return String.fromCharCode(65 + i);
        });
        rules = vis.selectAll("g.rule").data(x.ticks(10)).enter().append("svg:g").attr("class", "rule").attr("transform", function (d) {
          return "translate(".concat(x(d), ",0)");
        });
        rules.append("svg:line").attr("y1", h).attr("y2", h + 6).attr("stroke", "black");
        rules.append("svg:line").attr("y1", 0).attr("y2", h).attr("stroke", "white").attr("stroke-opacity", .3);
        rules.append("svg:text").attr("y", h + 9).attr("dy", ".71em").attr("text-anchor", "middle").text(x.tickFormat(10));
        return vis.append("svg:line").attr("y1", 0).attr("y2", h).attr("stroke", "black");
      });
    }
  };
}).call(void 0);
//# sourceMappingURL=bars.js.map
