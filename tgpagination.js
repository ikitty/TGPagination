/**
 * TG pagination module
 *
 * @param {Object} obj // {totalCount: Number, perPage: Number, render: Function }
 **/

TGPager = function (obj) {
    this.pagerWrap = document.getElementById('tgPager');
    this.perPage = 10 ;

    for (var i in obj) {
        obj[i] && (this[i] = obj[i]);
    }
    this.pageNum = Math.ceil(this.totalCount / this.perPage);
    this.init();
};

TGPager.prototype = {
    init: function () {
        //render first page
        this.render(0);
        this.createPage();
        this.numClick();
        this.btnClick();
    }

    // create pager DOM element and get these DOM 
    ,createPage: function () {
        var wrap = this.pagerWrap,
            sHtml = '<div tgpType="btnPrev" class="tgp_disabled">上一页</div>';

        for (var i = 1; i <= this.pageNum; i++) {
            if (1==i) {
                sHtml += '<p tgpOrder="'+i+'" class="tgp_current">' + i + '</p>';
            }else {
                sHtml += '<p tgpOrder="' + i +'">' + i + '</p>';
            }
        };
        sHtml += '<div tgpType="btnNext">下一页</div>';
        wrap.innerHTML = sHtml ;

        this.dom = {
            btnPrev: wrap.getElementsByTagName('div')[0]
            ,btnNext: wrap.getElementsByTagName('div')[1]
            ,btn: wrap.getElementsByTagName('div')
            ,num: wrap.getElementsByTagName('p')
        };
        this.dom.lastNum = this.dom.num[0];
    }

    // bind pager(number) click event
    ,numClick: function () {
        var me = this;
        for (var i = 0, k = null; k = this.dom.num[i] ; i++ ) {
            k.v = Number(k.getAttribute('tgpOrder')) ;
            k.onclick = function () {
                me.dom.lastNum.className = me.dom.lastNum.className.replace('tgp_current', '');
                this.className = 'tgp_current';
                me.statusChange(this.v);
                me.render((this.v -1) * me.perPage);
                me.dom.lastNum = this;
            }
        }
    }

    // bind pager(Btn) click event
    ,btnClick: function () {
        var me = this;
        for (var i = 0, k = null; k = this.dom.btn[i] ; i++ ) {
            k.onclick = function () {
                if (/\s*tgp_disabled\s*/gi.test(this.className)) {
                    return  ;
                }
                var lastOrder = Number(me.dom.lastNum.getAttribute('tgpOrder') ),
                    newOrder = 0;
                if (this.getAttribute('tgpType') == 'btnPrev') {
                    newOrder = lastOrder - 1;
                }else if (this.getAttribute('tgpType') == 'btnNext'){
                    newOrder = lastOrder + 1;
                }

                me.dom.lastNum.className = me.dom.lastNum.className.replace('tgp_current', '');
                me.dom.num[newOrder-1].className = 'tgp_current';
                me.render((newOrder -1) * me.perPage);
                me.statusChange(newOrder);

                me.dom.lastNum = me.dom.num[newOrder-1];
            }
        }
    }

    // sync the status of btn and number
    ,statusChange: function (v) {
        this.dom.btnPrev.className = '';
        this.dom.btnNext.className = '';

        if (v == 1) {
            this.dom.btnPrev.className = 'tgp_disabled';
        }else if (this.pageNum == v){
            this.dom.btnNext.className = 'tgp_disabled';
        }
    }
};
