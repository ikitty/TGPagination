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
            sHtml = '<div tgpType="btnFirst" class="tgp_disabled">首页</div><div tgpType="btnPrev" class="tgp_disabled">上一页</div>';

        for (var i = 1; i <= this.pageNum; i++) {
            if (1==i) {
                sHtml += '<p tgpOrder="'+i+'" class="tgp_current">' + i + '</p>';
            }else {
                sHtml += '<p tgpOrder="' + i +'">' + i + '</p>';
            }
        };
        sHtml += '<div tgpType="btnNext">下一页</div><div tgpType="btnEnd">尾页</div>';
        wrap.innerHTML = sHtml ;

        this.dom = {
            btnPrev: wrap.getElementsByTagName('div')[1]
            ,btnFirst: wrap.getElementsByTagName('div')[0]
            ,btnNext: wrap.getElementsByTagName('div')[2]
            ,btnEnd: wrap.getElementsByTagName('div')[3]
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
        var me = this,
            _type ;
        for (var i = 0, k = null; k = this.dom.btn[i] ; i++ ) {
            k.onclick = function () {
                if (/\s*tgp_disabled\s*/gi.test(this.className)) {
                    return  ;
                }
                var lastOrder = Number(me.dom.lastNum.getAttribute('tgpOrder') ),
                    newOrder = 0;
                _type = this.getAttribute('tgpType') ;
                if (_type == 'btnPrev') {
                    newOrder = lastOrder - 1;
                }else if (_type == 'btnNext'){
                    newOrder = lastOrder + 1;
                }else if (_type == 'btnFirst'){
                    newOrder = 1;
                }else if (_type == 'btnEnd'){
                    newOrder = me.pageNum ;
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
        for (var i = 0, k ; k = this.dom.btn[i] ; i++ ) {
            k.className = '';
        }

        if (v == 1) {
            this.dom.btnFirst.className = 'tgp_disabled';
            this.dom.btnPrev.className = 'tgp_disabled';
        }else if (this.pageNum == v){
            this.dom.btnNext.className = 'tgp_disabled';
            this.dom.btnEnd.className = 'tgp_disabled';
        }
    }
};
