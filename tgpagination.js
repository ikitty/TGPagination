/**
 * mod pager
 *
 * @param {Object} o ,necessary property: wrapId, totalCount, perPage, render
 **/
TJ.pager = function (o) {
    for (var i in o) {
        this[i] = o[i];
    }
    this.pageNum = Math.ceil(this.totalCount / this.perPage);

    var wrap = document.getElementById(this.wrapId);
    this.dom = {
        btnPrev: wrap.getElementsByTagName('div')[0]
        ,btnNext: wrap.getElementsByTagName('div')[1]
        ,btn: wrap.getElementsByTagName('div')
        ,num: wrap.getElementsByTagName('p')
    };
    this.dom.lastNum = this.dom.num[0];
    this.init();
};
TJ.pager.prototype = {
    init: function () {
        this.render(0);
        this.createPage();
        this.numClick();
        this.btnClick();
        //todo auto create num ele
    }

    ,createPage: function () {
        var sHtml = '<div class="">上一页</div>'; 
        for (var i = 1; i <= len; i++) {
            sHtml += '<p>' + i + '</p>';
        };
        sHtml += '<div>下一页</div>';
        this.dom.pagerWrap = sHtml ;
    }

    ,numClick: function () {
        var me = this;
        for (var i = 0, k = null; k = this.dom.num[i] ; i++ ) {
            k.v = Number(k.innerHTML) ;
            k.onclick = function () {
                TJ(me.dom.lastNum).removeClass('mod_pager_cur');
                TJ(this).addClass('mod_pager_cur');
                me.statusChange(this.v);
                me.render((this.v -1) * me.perPage);
                me.dom.lastNum = this;
            }
        }
    }

    ,btnClick: function () {
        var me = this;
        for (var i = 0, k = null; k = this.dom.btn[i] ; i++ ) {
            k.onclick = function () {
                if (TJ(this).hasClass('mod_pager_dis')) {
                    return  ;
                }
                var lastOrder = Number(me.dom.lastNum.innerHTML),
                    newOrder = 0;
                if (this.getAttribute('dataType') == 'btnPrev') {
                    newOrder = lastOrder - 1;
                }else if (this.getAttribute('dataType') == 'btnNext'){
                    newOrder = lastOrder + 1;
                }

                TJ(me.dom.lastNum).removeClass('mod_pager_cur');
                TJ(me.dom.num[newOrder-1]).addClass('mod_pager_cur');
                me.render((newOrder -1) * me.perPage);
                me.statusChange(newOrder);

                me.dom.lastNum = me.dom.num[newOrder-1];
            }
        }
    }

    ,statusChange: function (v) {
        TJ(this.dom.btn).removeClass('mod_pager_dis');

        if (v == 1) {
            TJ(this.dom.btnPrev).addClass('mod_pager_dis');
        }else if (this.pageNum == v){
            TJ(this.dom.btnNext).addClass('mod_pager_dis');
        }
    }
};

/* =====topest data ===== */
var topestData = {
    "data": [
        ["1", "奉义中郎将五级", "脆脆", "35974"],
        ["2", "武卫中郎将五级", "骑砍、小双", "27545"],
        ["3", "奉义中郎将二级", "DK丶皮蛋", "26250"],
        ["4", "奉义中郎将三级", "骑砍_葡萄", "25782"],
        ["5", "奉义中郎将二级", "王遗风", "25522"],
        ["6", "奉义中郎将一级", "鬼豪", "20773"],
        ["7", "奉义中郎将四级", "残生", "18777"],
        ["8", "奉义中郎将二级", "南蛮", "18314"],
        ["9", "奉义中郎将一级", "寸缕", "18129"],
        ["10", "奉义中郎将五级", "小贰", "17622"],
        ["11", "武卫中郎将四级", "于文则", "17436"],
        ["12", "奉义中郎将三级", "凉丶风", "17408"],
        ["13", "武卫中郎将五级", "珈蓝,虞侯", "17042"],
        ["14", "典军校尉五级", "骑砍_思密达", "16444"],
        ["15", "武卫中郎将五级", "止戈为武", "16335"],
        ["16", "奉义中郎将一级", "众神、艾儿邦", "16122"],
        ["17", "武卫中郎将五级", "骑砍_血盟_A6", "16089"],
        ["18", "奉义中郎将二级", "铁骑黑旋风", "15813"],
        ["19", "武卫中郎将一级", "条顿骑士团马超", "15721"],
        ["20", "奉义中郎将一级", "Earls", "15605"],
        ["21", "武卫中郎将三级", "征天紫龙", "15476"],
        ["22", "奉义中郎将二级", "丶伯丁", "15341"],
        ["23", "武卫中郎将四级", "骑砍-希尔瓦娜斯", "15266"],
        ["24", "武卫中郎将五级", "浅唱聆听丶", "15011"],
        ["25", "武卫中郎将五级", "看似有情丶却无情", "15003"],
        ["26", "武卫中郎将一级", "血盟_仓管王垕", "14859"],
        ["27", "武卫中郎将五级", "空闻大湿", "14730"],
        ["28", "武卫中郎将二级", "HERO剑拳", "14268"],
        ["29", "武卫中郎将三级", "骑砍_老空", "14131"],
        ["30", "奉义中郎将三级", "虎贲军小怪兽", "14038"],
        ["31", "武卫中郎将一级", "离恨天丶缠晴", "14020"],
        ["32", "武卫中郎将五级", "骑砍_禽兽", "13982"],
        ["33", "武卫中郎将五级", "铁骑龙殇", "13372"],
        ["34", "典军校尉五级", "X_Jixyo", "13217"],
        ["35", "奉义中郎将一级", "洋葱", "12942"],
        ["36", "典军校尉五级", "张文远", "12902"],
        ["37", "奉义中郎将一级", "珈蓝大神", "12731"],
        ["38", "武卫中郎将五级", "刀锋骑士", "12367"],
        ["39", "武卫中郎将一级", "真田幸村°", "12291"],
        ["40", "典军校尉五级", "阿来来", "12210"],
        ["41", "典军校尉四级", "铁骑猛丁哥", "12170"],
        ["42", "奉义中郎将一级", "司狼不古", "11961"],
        ["43", "典军校尉三级", "骑砍_血盟lun", "11960"],
        ["44", "典军校尉三级", "骑砍_张辽", "11955"],
        ["45", "武卫中郎将五级", "远乐", "11767"],
        ["46", "奉义中郎将二级", "2B笑傲丨小太爷", "11391"],
        ["47", "奉义中郎将一级", "MaLo", "11355"],
        ["48", "武卫中郎将五级", "颜羽沫", "11344"],
        ["49", "武卫中郎将五级", "HERO亚雷斯", "11258"],
        ["50", "武卫中郎将一级", "龙骑兵V赵子阳", "10908"],
        ["51", "奉义中郎将一级", "铁骑伊泽", "10853"],
        ["52", "武卫中郎将五级", "HERO查查", "10624"],
        ["53", "武卫中郎将四级", "叛逆灬神射", "10387"],
        ["54", "武卫中郎将五级", "铁骑鴉", "10365"],
        ["55", "武卫中郎将一级", "粉蒸肉", "10193"],
        ["56", "武卫中郎将五级", "悍将丶浮屠", "9970"],
        ["57", "武卫中郎将五级", "骑砍_绿毛鸡", "9969"],
        ["58", "武卫中郎将五级", "发飙的核弹", "9934"],
        ["59", "武卫中郎将五级", "Tog丶風", "9919"],
        ["60", "武卫中郎将三级", "慕云", "9900"],
        ["61", "武卫中郎将一级", "抹黑黑", "9720"],
        ["62", "武卫中郎将三级", "谜尸黯缄", "9704"],
        ["63", "典军校尉二级", "珈蓝武士", "9633"],
        ["64", "武卫中郎将三级", "羽林衛-小布", "9606"],
        ["65", "典军校尉二级", "Joker", "9450"],
        ["66", "典军校尉五级", "悍将丶弈天", "9380"],
        ["67", "武卫中郎将五级", "铁骑槟槟", "9365"],
        ["68", "典军校尉三级", "Victor", "9219"],
        ["69", "武卫中郎将五级", "镜花水月", "9167"],
        ["70", "武卫中郎将一级", "我是新人别砍我", "9156"],
        ["71", "武卫中郎将三级", "虬髯客", "9122"],
        ["72", "武卫中郎将五级", "我爱吃鸡腿啊", "9109"],
        ["73", "武卫中郎将一级", "Xiao丶懒猪", "9088"],
        ["74", "武卫中郎将一级", "卯时四刻色鬼", "8869"],
        ["75", "武卫中郎将四级", "Now小石头", "8681"],
        ["76", "典军校尉五级", "夜无情", "8653"],
        ["77", "典军校尉五级", "狼兵メ猪头", "8630"],
        ["78", "典军校尉四级", "铁骑丶斌斌", "8507"],
        ["79", "典军校尉一级", "君临城主", "8436"],
        ["80", "典军校尉二级", "卷毛", "8301"],
        ["81", "武卫中郎将三级", "Homura", "8261"],
        ["82", "典军校尉二级", "骑砍_SYS", "8258"],
        ["83", "典军校尉五级", "冷漠de眼神", "8220"],
        ["84", "典军校尉一级", "守恒K", "8143"],
        ["85", "典军校尉五级", "血盟_大嫖客", "8112"],
        ["86", "武卫中郎将一级", "珈蓝丶卧虫", "8110"],
        ["87", "中军校尉五级", "骑砍_韩信", "8025"],
        ["88", "典军校尉四级", "马超", "8022"],
        ["89", "武卫中郎将五级", "迦楼西", "7972"],
        ["90", "典军校尉四级", "曹曹", "7920"],
        ["91", "典军校尉五级", "慕天狼丶", "7905"],
        ["92", "典军校尉一级", "绯...", "7755"],
        ["93", "典军校尉五级", "HERO尛燚", "7733"],
        ["94", "典军校尉四级", "龙吟丶马超", "7696"],
        ["95", "典军校尉二级", " 铁骑家园", "7600"],
        ["96", "典军校尉一级", "See", "7563"],
        ["97", "典军校尉五级", "丶清剑", "7519"],
        ["98", "典军校尉二级", " 笑忘五湖风", "7479"],
        ["99", "典军校尉一级", "Mrw丶唯枫", "7451"],
        ["100", "武卫中郎将四级", "曇天", "7447"]
    ]
};
var topest = {};
topest.render = function (elParent, order, len) {
    var d = topestData.data,
        sHtml = '';

    for (var i = order || 0 , count = 1; i < len + order; i++ ) {
        var bgCls = '',
            colorCls = '';
        if (count % 2 != 0) {
            bgCls = 'bg_odd';
        }
        if (count<4) {
            colorCls = 'co_red'+count;
        }
        count++;
        sHtml += '<li class="' + bgCls + ' ' + colorCls + '"><p class="c1">' + this.fixNum(d[i][0], 3) + '</p><p>' + d[i][1] + '</p><p>' + d[i][2] + '</p><p>' + d[i][3] + '</p></li>';
    }
    elParent.innerHTML = sHtml ;
};
topest.fixNum = function (v, len) {
    return len > v.length ? (new Array(len-v.length + 1)).join('0')+v : v ;
};

var topPagerArg = {
    wrapId: 'xPager'
    ,totalCount: topestData.data.length
    ,perPage: 10
    ,render:function (start) {
        topest.render(TJ('#xList')[0], start, topPagerArg.perPage );
    }
};
// init topest pager
var pTop = new TJ.pager(topPagerArg);
