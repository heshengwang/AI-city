/**
 * 一标六实主面板
 * 2018/05/08
 */
define(
    ['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', '/modules/config/echartsConfig.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common'],
	function(app, controllers, $, configFile, echartsConfig, notify, dark, dMapCtrl, common) {
		var communityPanelCtrl = [
            '$scope',
            '$state',
            '$stateParams',
            'communityAllService',
            'mapService',
            '$compile',
            'communityRightModuleService',
            'moreService',
            '$interval',
            function($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval) {
                // 设置样式
                window.onResize = function() {
                    var baseWidth = 1920;
                    var screenWidth = document.body.clientWidth;
                    windowHtmlSize = screenWidth / baseWidth * 100;
                    var defSize = screenWidth / baseWidth;
                    var axisFontSize = defSize * 24;
                    $("html").css({
                        fontSize: windowHtmlSize + 'px'
                    });
                }
                onResize();
                $(".layout").find("div").eq(0).css({
                    "padding-top": "0px"
                });

                /*
                 * 左、右、下面板，打开/关闭
                 **/
                var leftPanel = $(".PanelLeft"),
                    rightPanel = $(".PanelRight"),
                    togglePanelTime = 1000,
                    closePosition = '-4.19rem',
                    openPosition = '.08rem';
                $scope.isLeftClosed = false;
				$scope.togglePanelLeftMethod = function() {
					if($scope.isLeftClosed) {
						$scope.isLeftClosed = false;
						leftPanel.animate({ left: openPosition }, togglePanelTime);
					} else {
						$scope.isLeftClosed = true;
						leftPanel.animate({ left: closePosition }, togglePanelTime);
					}
                }
                $scope.isRightClosed = false;
				$scope.togglePanelRightMethod = function() {
					if($scope.isRightClosed) {
						$scope.isRightClosed = false;
						rightPanel.animate({ right: openPosition }, togglePanelTime);
					} else {
						$scope.isRightClosed = true;
						rightPanel.animate({ right: closePosition }, togglePanelTime);
					}
				}
                
                // WeekAnalysis 一周感知数据量统计
                var WeekAnalysisECharts = null;
                var weekAnalysisOption = echartsConfig.BarEcharts(
                    ['MAC感知', '开门记录', '事件感知', '人脸抓拍', '过车感知'],
                    [120, 200, 150, 80, 70]
                );

                echarts.dispose(document.getElementById("WeekAnalysis"));
                WeekAnalysisECharts = echarts.init(document.getElementById('WeekAnalysis'));
                WeekAnalysisECharts.setOption(weekAnalysisOption);

                WeekAnalysisECharts.on('click', function(params){
                    console.log(params, 113)
                })

                // WeekAnalysis - realtimeAnalysis 实时统计
                var realtimeAnalysisECharts = null;
                var realtimeAnalysisOption = echartsConfig.LineEcharts(['1200', '1400', '1008', '1411', '626', '588', '300', '100'])

                realtimeAnalysisOption.xAxis.data = [];
                for(var i = 0; i < 8; i++) {
                    realtimeAnalysisOption.xAxis.data.push(common.formatDate(common.addSeconds(new Date(), -5 * (7 - i))).CurrentHms);
                }

                echarts.dispose(document.getElementById("realtimeAnalysis"));
                realtimeAnalysisECharts = echarts.init(document.getElementById('realtimeAnalysis'));
                realtimeAnalysisECharts.setOption(realtimeAnalysisOption);

                // TodayAnalysis - 今日实有警情分析
                var TodayAnalysisECharts = null;
                var TodayAnalysisOption = echartsConfig.RadarEcharts()
                TodayAnalysisECharts = echarts.init(document.getElementById('TodayAnalysis'));
                TodayAnalysisECharts.setOption(TodayAnalysisOption);

                // resize echarts
                $(window).resize(function() {
                    WeekAnalysisECharts.resize();
                    realtimeAnalysisECharts.resize();
                    TodayAnalysisECharts.resize();
                })
            }
        ]
		return communityPanelCtrl;
    }
);