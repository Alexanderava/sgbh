(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var ok = style.getPropertyValue('--ok').trim();
  var warn = style.getPropertyValue('--warn').trim();
  var dead = style.getPropertyValue('--dead').trim();

  var el = document.getElementById('chart-dist');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });
  chart.setOption({
    animation: false,
    color: [accent, ok, accent2, warn, muted, dead],
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) {
        return p.name + '：' + p.value + ' 个（' + p.percent + '%）';
      }
    },
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: { color: ink, fontSize: 12 },
      itemWidth: 12,
      itemHeight: 12
    },
    series: [{
      name: '兑换码分布',
      type: 'pie',
      radius: ['38%', '66%'],
      center: ['50%', '44%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 6
      },
      label: {
        show: true,
        formatter: '{b}\n{c} 个',
        color: ink,
        fontSize: 12
      },
      labelLine: { lineStyle: { color: muted } },
      data: [
        { name: '长期有效码', value: 68 },
        { name: '限时/活动/节日码', value: 13 },
        { name: '已过期码（存档）', value: 1 }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart.resize(); });
})();
