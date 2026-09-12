import{H as xt,Y as ct,u as Vt,p as k,a$ as pt,_ as et,m as _t,c as f,h as w,o as d,g,t as r,az as bt,b0 as zt,b1 as Lt,Q as kt,b2 as Bt,G as Ct,V as Wt,r as I,f as _,w as e,a,e as dt,b as it,al as jt,B as wt,l as p,E as Dt,z as D,F as St,j as At,aE as ft,N as z,aF as gt,I as Qt,b3 as Kt,ao as Xt,d as Ft,a0 as Ht,D as Yt,aD as Pt,aA as Zt,aV as Gt,ax as Jt,ab as mt,C as $t,aY as te,aN as ee,aZ as ae,Z as oe,R as ne,X as le,q as de,aW as ie,b4 as se,b5 as re,aX as ue,b6 as me}from"./app-BgF-gYTR.js";import{a as Ot}from"./apiAdmin-CouewlcH.js";import{s as ce}from"./sumBy-BAg9usfB.js";import{f as pe}from"./filter-Bs6E9-Ne.js";import{C as _e}from"./CustomerAddButton-C8v4jiBL.js";import{I as fe}from"./Invoice-C9ircP3R.js";import{C as ge}from"./ContainerOutlined-DANFROt_.js";import{U as ye}from"./UnorderedListOutlined-eFDqbmBA.js";import{S as ve}from"./ShoppingCartOutlined-DTBB2zPn.js";import{S as he}from"./SettingOutlined-gdjrcMUJ.js";import{S as xe}from"./SaveOutlined-kALTEoB3.js";import"./fields-BSWTY-Ka.js";import"./Upload-CmAZoRcW.js";import"./AddButton-Z6orP-71.js";import"./AddEdit-Dm-5kUJV.js";import"./AddButton-B_uNe02o.js";import"./AddEdit-DMURHVio.js";import"./BarcodeGenerator-vvq_hYvM.js";import"./SendOutlined-ClYmOylq.js";import"./PrinterOutlined-CdEwXLS4.js";xt.div`
    border-radius: 10px;
    background-color: #fff;
    position: relative;
	width: 100%;

    @media only screen and (max-width: 767px){
        max-width: 350px;
        margin: 0 auto;
    }
    &.list-view{
        max-width: 100%;
        .product-single-price__offer{
            @media only screen and (max-width: 991px) and (min-width: 768px){
                display: block;
            }
        }
    }
    .product-list{
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        figure{
            @media only screen and (max-width: 1199px){
            }
            @media only screen and (max-width: 991px){
                margin: 0 0 20px;
            }
            img{
                border-radius: 10px;
            }
        }
        .product-single-description{
            p{
                font-size: 15px;
            }
        }
        .product-single-title{
            font-size: 18px;
            margin: 25px 0 16px;
            @media only screen and (max-width: 1199px){
                margin: 0 0 16px;
            }
        }
        .product-single-info{
            margin-top: 25px;
            @media only screen and (max-width: 1199px){
                margin-top: 0;
            }
        }
        .product-single-price__new{
            font-size: 16px;
        }
        .product-single-action{
            flex-flow: column;
            align-items: flex-start;
            margin: 28px 0 0 0;
            button{
                min-width: 132px;
                margin: 0;
                padding: 0px 14px;
                height: 38px;
            }
            .btn-cart{
                margin: 0 0 10px;
            }
            .ant-btn-sm{
                height: 38px;
            }
        }
        .btn-heart{
            @media only screen and (max-width: 1599px){
                top: 0;
            }
            @media only screen and (max-width: 1199px){
                top: -4px;
            }
            @media only screen and (max-width: 991){
                top: 0;
            }
        }
    }
    figure{
        margin-bottom: 0;
        img{
            width: 100px;
        }
    }
    figcaption{
        padding: 20px 20px 26px;
    }
    .quantity-box{
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 15px;
        top: 1px;
        background-color: #fff;
		padding: 0 6px;
		left: 1px;
    }
    .product-single-title{
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: 500;

    }
    .product-single-price{
        margin-bottom: 5px;
        del{
            margin: 0 5px;
        }
    }
    .product-single-price__new{
        font-weight: 600;
    }
    .product-single-price__offer{
        font-weight: 500;
        font-size: 12px;
    }
    .product-single-rating{
        font-size: 12px;
        font-weight: 500;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .ant-rate-star{
            div{
                transform: none !important;
            }
        }
        .total-reviews{
            font-weight: 400;
          
        }
        svg{
            width: 13px;
        }
    }
    .product-single-action{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 20px -5px -5px -5px;
        button{
            font-size: 12px;
            margin: 5px;
        }


        .ant-btn-sm{
            font-size: 12px;
            padding: 0px 18.065px;
            height: 36px;
        }
    }
`;const be=xt.div`
    max-width: 650px;
    margin: 0 auto;
    .ant-card{
        margin-bottom: 0 !important;
    }

    .ant-form-item{
        margin-bottom: 0;
    }

    .summary-table-title{
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 25px;
      
    }
    .order-summary-inner{
        padding-bottom: 5px;
        @media only screen and (max-width: 1599px){
            max-width: 600px;
            margin: 0 auto;
        }
        .ant-form-item-control{
            line-height: 2.2;
        }
        .ant-form-item-control-wrapper{
            width: 100%;
        }
        .ant-select{
            .ant-select-selection-item{
                font-weight: 500;
            }
        }
        .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
            height: 30px !important;
        }
    }
    .invoice-summary-inner{
        .summary-list{
            margin: 22px 0;
            li{
                &:not(:last-child){
                    margin-bottom: 12px;
                }
            }
        }
      
    }

    .summary-list{
		padding: 0;
        li{
            display: flex;
            justify-content: space-between;
            &:not(:last-child){
                margin-bottom: 18px;
            }
            span{
                font-weight: 500;
            }
          
        }
    }
    .ant-select-focused.ant-select-single{
        .ant-select-selector{
            box-shadow: 0 0 !important;
        }
    }
    .ant-select-single{
        margin-top: 18px;
        .ant-select-selection-search-input{
            height: fit-content;
        }
        .ant-select-selector{
            padding: 0 !important;
            border: 0 none !important;
            
        }
       
    }
    .promo-apply-form{
        display: flex;
        align-items: flex-end;
        margin: 5px 0 18px;
        @media only screen and (max-width: 479px){
            flex-flow: column;
            align-items: flex-start;
        }
        .ant-form-item{
            margin-bottom: 0;
        }
        .ant-row{
            flex: auto;
            flex-flow: column;
        }
        .ant-form-item-label{
            text-align: 'right';
            line-height: 30px;
            label{
                font-weight: 400;
                margin-bottom: 4px;
                height: fit-content;
                
            }
        }
        .ant-form-item-control-wrapper{
            display: flex;
            width: 100%;
            @media only screen and (max-width: 479px){
                flex-flow: column;
            }
            .ant-form-item-control{
                width: 100%;
            }
            .ant-form-item-children{
                display: block;
                margin: '0 6px 0 0';
                height: auto;
                @media only screen and (max-width: 479px){
                    margin: '0 6px 10px 0';
                }
            }
            input{
                height: 40px;
                @media only screen and (max-width: 479px){
                    width: 100% !important;
                }
            }
            button{
                height: 40px;
            }
        }
    }
    .summary-total{
        display: inline-flex;
        justify-content: space-between;
        width: 100%;
        .summary-total-label{
            font-size: 16px;
            font-weight: 500;
          
        }
        .summary-total-amount{
            font-size: 18px;
            font-weight: 600;
          
        }
    }
    .btn-proceed{
        font-size: 15px;
        font-weight: 500;
        width: 100%;
        height: 50px;
        border-radius: 8px;
        margin-top: 22px;
        @media only screen and (max-width: 575px){
            font-size: 13px;
        }
        a{
            display: flex;
            align-items: center;
        }
        i,
        svg{
            'margin-left' : 6px;
            color: #fff;
        }
    }
`,ke=()=>{const{t:o}=ct();Vt();const l=k([]);k([]);const v=k([]),t=k([]),N=k([]),W=k([]),m=k({}),c=k({user_id:void 0,tax_id:void 0,category_id:void 0,brand_id:void 0,tax_id:void 0,tax_rate:0,tax_amount:0,discount_type:"percentage",discount_value:0,discount:0,shipping:0,subtotal:0}),h=[{title:"#",dataIndex:"sn"},{title:o("product.name"),dataIndex:"name"},{title:o("product.quantity"),dataIndex:"unit_quantity"},{title:o("product.subtotal"),dataIndex:"subtotal"},{title:o("common.action"),dataIndex:"action"}],E="customers?limit=10000";return{taxes:l,customers:v,brands:t,categories:N,productLists:W,formData:c,customerUrl:E,orderItemColumns:h,getPreFetchData:()=>{const u=axiosAdmin.get("taxes?limit=10000"),R=axiosAdmin.get(E),Q=axiosAdmin.get("categories?limit=10000"),P=axiosAdmin.get("brands?limit=10000"),q=axiosAdmin.post("pos/products",{brand_id:c.value.brand_id,category_id:c.value.category_id}),T=axiosAdmin.get("default-walkin-customer");Promise.all([u,R,q,Q,P,T]).then(([V,C,K,O,b,B])=>{l.value=V.data,v.value=C.data,N.value=O.data,t.value=b.data,W.value=K.data.products;var S=pt(v.value,["xid",B.data.customer.xid]);S&&(m.value=S,c.value={...c.value,user_id:S.xid})})},posDefaultCustomer:m}},Ce={props:["product","isAdded"],setup(o){const{formatAmountCurrency:l}=_t();return{formatAmountCurrency:l}}},we={key:0,class:"product-pos"},De={class:"product-pos-top"},Se={href:"javascript:void(0)"},Ae={key:0,class:"quantity-box",to:"#"},Fe={key:1,class:"quantity-box",to:"#"},Pe=["src"],Oe={class:"product-pos-bottom"},Ie={class:"product-title"},Ee={class:"product-details"},qe={class:"product-details-row"},Re={class:"product-subtotal"},Ue={key:0,class:"added-tag"};function Me(o,l,v,t,N,W){return v.product&&v.product.xid?(d(),f("div",we,[g("div",De,[g("a",Se,[v.product.product_type=="service"?(d(),f("span",Ae,r(o.$t("product.service")),1)):(d(),f("span",Fe,r(v.product.stock_quantity)+" "+r(v.product.unit.short_name),1)),g("img",{src:v.product.image_url,class:"img-fit"},null,8,Pe)])]),g("div",Oe,[g("div",null,[g("h5",Ie,r(v.product.name),1)]),g("div",Ee,[g("div",qe,[g("span",Re,r(t.formatAmountCurrency(v.product.subtotal)),1),v.isAdded?(d(),f("span",Ue,r(o.$t("product.added")),1)):w("",!0)])])])])):w("",!0)}const Ne=et(Ce,[["render",Me]]),Te={props:["visible","data","selectedProducts"],emits:["closed","success"],components:{CheckOutlined:Bt,PlusOutlined:kt,LeftOutlined:Lt,RightOutlined:zt,DeleteOutlined:bt},setup(o,{emit:l}){const{addEditRequestAdmin:v,loading:t,rules:N}=Ot(),{appSetting:W,formatAmountCurrency:m}=_t(),c=k([]),h=k({payment_mode_id:void 0,amount:0,notes:""}),{t:E}=ct(),i=k([]),u=k([{title:E("payments.payment_mode"),dataIndex:"payment_mode"},{title:E("payments.amount"),dataIndex:"amount"},{title:E("common.action"),dataIndex:"action"}]),R=k(!1);Ct(()=>{axiosAdmin.get("payment-modes").then(O=>{c.value=O.data})});const Q=()=>{h.value={payment_mode_id:void 0,amount:0,notes:""},i.value=[],l("closed")},P=()=>{v({url:"pos/payment",data:h.value,success:O=>{i.value=[...i.value,{...h.value,id:Math.random().toString(36).slice(2)}],h.value={payment_mode_id:void 0,amount:0,notes:""},R.value=!1}})},q=()=>{const O={all_payments:i.value,product_items:o.selectedProducts,details:o.data};v({url:"pos/save",data:O,successMessage:o.successMessage,success:b=>{h.value={payment_mode_id:void 0,amount:0,notes:""},i.value=[],R.value=!1,l("success",b.order)}})},T=()=>{h.value={payment_mode_id:void 0,amount:0,notes:""},R.value=!1},V=O=>{var b=pt(c.value,["xid",O]);return b?b.name:"-"},C=O=>{var b=pe(i.value,B=>B.id!=O);i.value=b},K=Wt(()=>{var O=ce(i.value,b=>parseFloat(b.amount));return O+parseFloat(h.value.amount)});return{loading:t,rules:N,drawerClosed:Q,paymentModes:c,formData:h,appSetting:W,formatAmountCurrency:m,onSubmit:P,allPaymentRecords:i,paymentRecordsColumns:u,showAddForm:R,completeOrder:q,goBack:T,getPaymentModeName:V,deletePayment:C,totalEnteredAmount:K,drawerWidth:window.innerWidth<=991?"90%":"50%"}}},Ve={style:{color:"#7c8db5 !important"}};function ze(o,l,v,t,N,W){const m=jt,c=it,h=dt,E=I("PlusOutlined"),i=wt,u=I("RightOutlined"),R=I("LeftOutlined"),Q=I("DeleteOutlined"),P=Dt,q=gt,T=ft,V=At,C=Qt,K=Kt,O=I("CheckOutlined"),b=St,B=Xt;return d(),_(B,{title:o.$t("payments.order_payment"),width:t.drawerWidth,maskClosable:!1,open:v.visible,onClose:t.drawerClosed},{default:e(()=>[a(h,null,{default:e(()=>[a(c,{xs:24,sm:24,md:8,lg:8},{default:e(()=>[a(h,null,{default:e(()=>[a(c,{span:24},{default:e(()=>[a(m,{title:o.$t("stock.total_items"),value:v.selectedProducts.length,style:{"margin-right":"50px"}},null,8,["title","value"])]),_:1}),a(c,{span:24,class:"mt-20"},{default:e(()=>[a(m,{title:o.$t("stock.paying_amount"),value:t.formatAmountCurrency(t.totalEnteredAmount)},null,8,["title","value"])]),_:1}),a(c,{span:24,class:"mt-20"},{default:e(()=>[a(m,{title:o.$t("stock.payable_amount"),value:t.formatAmountCurrency(v.data.subtotal)},null,8,["title","value"])]),_:1}),a(c,{span:24,class:"mt-20"},{default:e(()=>[t.totalEnteredAmount<=v.data.subtotal?(d(),_(m,{key:0,title:o.$t("payments.due_amount"),value:t.formatAmountCurrency(v.data.subtotal-t.totalEnteredAmount)},null,8,["title","value"])):(d(),_(m,{key:1,title:o.$t("stock.change_return"),value:t.formatAmountCurrency(t.totalEnteredAmount-v.data.subtotal)},null,8,["title","value"]))]),_:1})]),_:1})]),_:1}),a(c,{xs:24,sm:24,md:16,lg:16},{default:e(()=>[a(h,{gutter:[24,24]},{default:e(()=>[t.showAddForm?(d(),_(c,{key:1,span:24},{default:e(()=>[a(h,null,{default:e(()=>[a(c,{xs:24,sm:24,md:10,lg:10},{default:e(()=>[a(i,{block:!0,type:"primary",onClick:t.goBack},{default:e(()=>[a(R),p(" "+r(o.$t("common.back")),1)]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})):(d(),_(c,{key:0,span:24},{default:e(()=>[a(h,{gutter:[16,8],class:"mt-20"},{default:e(()=>[a(c,{xs:24,sm:24,md:10,lg:10},{default:e(()=>[a(i,{block:!0,type:"primary",onClick:l[0]||(l[0]=()=>t.showAddForm=!0)},{default:e(()=>[a(E),p(" "+r(o.$t("payments.add")),1)]),_:1})]),_:1}),a(c,{xs:24,sm:24,md:10,lg:10},{default:e(()=>[a(i,{loading:t.loading,block:!0,onClick:t.completeOrder},{default:e(()=>[p(r(o.$t("stock.complete_order"))+" ",1),a(u)]),_:1},8,["loading","onClick"])]),_:1})]),_:1})]),_:1})),t.showAddForm?(d(),_(c,{key:3,span:24},{default:e(()=>[a(b,{layout:"vertical"},{default:e(()=>[a(h,{gutter:16},{default:e(()=>[a(c,{xs:24,sm:24,md:12,lg:12},{default:e(()=>[a(V,{label:o.$t("payments.payment_mode"),name:"payment_mode_id",help:t.rules.payment_mode_id?t.rules.payment_mode_id.message:null,validateStatus:t.rules.payment_mode_id?"error":null},{default:e(()=>[a(T,{value:t.formData.payment_mode_id,"onUpdate:value":l[1]||(l[1]=S=>t.formData.payment_mode_id=S),placeholder:o.$t("common.select_default_text",[o.$t("payments.payment_mode")]),allowClear:!0},{default:e(()=>[(d(!0),f(D,null,z(t.paymentModes,S=>(d(),_(q,{key:S.xid,value:S.xid},{default:e(()=>[p(r(S.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label","help","validateStatus"])]),_:1}),a(c,{xs:24,sm:24,md:12,lg:12},{default:e(()=>[a(V,{label:o.$t("stock.paying_amount"),name:"amount",help:t.rules.amount?t.rules.amount.message:null,validateStatus:t.rules.amount?"error":null},{default:e(()=>[a(C,{prefix:t.appSetting.currency.symbol,value:t.formData.amount,"onUpdate:value":l[2]||(l[2]=S=>t.formData.amount=S),placeholder:o.$t("common.placeholder_default_text",[o.$t("stock.payable_amount")])},null,8,["prefix","value","placeholder"]),g("small",Ve,[p(r(o.$t("stock.payable_amount"))+" ",1),g("span",null,r(t.formatAmountCurrency(v.data.subtotal)),1)])]),_:1},8,["label","help","validateStatus"])]),_:1})]),_:1}),a(h,{gutter:16},{default:e(()=>[a(c,{xs:24,sm:24,md:24,lg:24},{default:e(()=>[a(V,{label:o.$t("payments.notes"),name:"notes",help:t.rules.notes?t.rules.notes.message:null,validateStatus:t.rules.notes?"error":null},{default:e(()=>[a(K,{value:t.formData.notes,"onUpdate:value":l[3]||(l[3]=S=>t.formData.notes=S),placeholder:o.$t("payments.notes"),rows:5},null,8,["value","placeholder"])]),_:1},8,["label","help","validateStatus"])]),_:1})]),_:1}),a(h,{gutter:16},{default:e(()=>[a(c,{xs:24,sm:24,md:24,lg:24},{default:e(()=>[a(i,{type:"primary",loading:t.loading,onClick:t.onSubmit,block:""},{icon:e(()=>[a(O)]),default:e(()=>[p(" "+r(o.$t("common.add")),1)]),_:1},8,["loading","onClick"])]),_:1})]),_:1})]),_:1})]),_:1})):(d(),_(c,{key:2,span:24},{default:e(()=>[a(P,{dataSource:t.allPaymentRecords,columns:t.paymentRecordsColumns,pagination:!1},{bodyCell:e(({column:S,record:U})=>[S.dataIndex==="payment_mode"?(d(),f(D,{key:0},[p(r(t.getPaymentModeName(U.payment_mode_id)),1)],64)):w("",!0),S.dataIndex==="amount"?(d(),f(D,{key:1},[p(r(t.formatAmountCurrency(U.amount)),1)],64)):w("",!0),S.dataIndex==="action"?(d(),_(i,{key:2,type:"primary",onClick:G=>t.deletePayment(U.id),danger:""},{icon:e(()=>[a(Q)]),_:1},8,["onClick"])):w("",!0)]),_:1},8,["dataSource","columns"])]),_:1}))]),_:1})]),_:1})]),_:1})]),_:1},8,["title","width","open","onClose"])}const Le=et(Te,[["render",ze]]),Be=Ft({props:["formData","brands","categories"],emits:["changed"],components:{ContainerOutlined:ge},setup(o,{emit:l}){return{reFetchProducts:()=>{l("changed")},getCategoryName:N=>N.length>9?N.substring(0,8)+"..":N}}}),We=["onClick"];function je(o,l,v,t,N,W){const m=I("ContainerOutlined"),c=Ht,h=Yt,E=it,i=dt;return d(),_(i,{gutter:[16,16]},{default:e(()=>[a(E,{xs:24,sm:24,md:24,lg:24,xl:24,class:"pos-style-1-category-scroll"},{default:e(()=>[g("div",{onClick:l[0]||(l[0]=()=>{o.formData.category_id=void 0,o.reFetchProducts()}),class:"pos-style-1-category-box"},[a(c,{shape:"square",size:"large",style:{backgroundColor:"#fff",color:"black",verticalAlign:"middle",marginTop:"5px"}},{icon:e(()=>[a(m)]),_:1}),g("p",null,r(o.$t("common.all")),1)]),(d(!0),f(D,null,z(o.categories,u=>(d(),f("div",{key:u.xid,onClick:()=>{o.formData.category_id=u.xid,o.reFetchProducts()},class:"pos-style-1-category-box"},[a(h,{title:u.name},{default:e(()=>[a(c,{size:"large",src:u.image_url,style:{verticalAlign:"middle",marginTop:"5px"}},null,8,["src"]),g("p",null,r(o.getCategoryName(u.name)),1)]),_:2},1032,["title"])],8,We))),128))]),_:1})]),_:1})}const Qe=et(Be,[["render",je]]),Ke=Ft({props:["formData","brands","categories"],emits:["changed"],setup(o,{emit:l}){return{reFetchProducts:()=>{l("changed")}}}});function Xe(o,l,v,t,N,W){const m=gt,c=ft,h=it,E=Pt,i=dt;return d(),_(i,{gutter:[16,16]},{default:e(()=>[a(h,{xs:24,sm:24,md:12,lg:12,xl:12},{default:e(()=>[a(c,{value:o.formData.brand_id,"onUpdate:value":l[0]||(l[0]=u=>o.formData.brand_id=u),placeholder:o.$t("common.select_default_text",[o.$t("product.brand")]),allowClear:!0,style:{width:"100%"},optionFilterProp:"title","show-search":"",onChange:o.reFetchProducts},{default:e(()=>[(d(!0),f(D,null,z(o.brands,u=>(d(),_(m,{key:u.xid,title:u.name,value:u.xid},{default:e(()=>[p(r(u.name),1)]),_:2},1032,["title","value"]))),128))]),_:1},8,["value","placeholder","onChange"])]),_:1}),a(h,{xs:24,sm:24,md:12,lg:12,xl:12},{default:e(()=>[a(E,{compact:""},{default:e(()=>[a(c,{value:o.formData.category_id,"onUpdate:value":l[1]||(l[1]=u=>o.formData.category_id=u),placeholder:o.$t("common.select_default_text",[o.$t("product.category")]),allowClear:!0,style:{width:"100%"},optionFilterProp:"title","show-search":"",onChange:o.reFetchProducts},{default:e(()=>[(d(!0),f(D,null,z(o.categories,u=>(d(),_(m,{key:u.xid,title:u.name,value:u.xid},{default:e(()=>[p(r(u.name),1)]),_:2},1032,["title","value"]))),128))]),_:1},8,["value","placeholder","onChange"])]),_:1})]),_:1})]),_:1})}const He=et(Ke,[["render",Xe]]),Ye={components:{PlusOutlined:kt,SearchOutlined:Gt,EditOutlined:Zt,DeleteOutlined:bt,SaveOutlined:xe,SettingOutlined:he,ShoppingCartOutlined:ve,UnorderedListOutlined:ye,PosLayout1:Qe,PosLayout2:He,ProductCardNew:Ne,OrderSummary:be,PayNow:Le,CustomerAddButton:_e,InvoiceModal:fe},setup(){const{taxes:o,customers:l,brands:v,categories:t,productLists:N,orderItemColumns:W,formData:m,customerUrl:c,getPreFetchData:h,posDefaultCustomer:E}=ke(),i=k([]),u=k([]),R=k([]),Q=k(1),P=de({orderSearchTerm:void 0,productFetching:!1,products:[]}),{formatAmount:q,formatAmountCurrency:T,appSetting:V,taxTypes:C,permsArray:K}=_t(),{addEditRequestAdmin:O}=Ot(),{t:b}=ct(),B=k(!1),S=k(!1),U=k({}),G=k([]),J=k(""),H=k(!1),$=k(!1),Y=k({}),at=k(!1);Ct(()=>{h()});const tt=()=>{axiosAdmin.post("pos/products",{brand_id:m.value.brand_id,category_id:m.value.category_id}).then(s=>{N.value=s.data.products})},st=ie(s=>{ot(s)},300),ot=s=>{P.products=[],s!=""&&(P.productFetching=!0,axiosAdmin.post("search-product",{order_type:"sales",search_term:s}).then(A=>{A.data.length==1?nt("",{product:A.data[0]}):P.products=A.data,P.productFetching=!1}))},rt=s=>{me(()=>{s.keyCode==13&&ot(s.target.value)})},nt=(s,y)=>{const A=y.product;n(A)},n=s=>{if(se(u.value,s.xid)){const M=pt(i.value,["xid",s.xid]);if(M&&(M.quantity<M.stock_quantity||M.product_type=="service")){const F=[];var A={};i.value.map(j=>{var X=j.quantity;j.xid==s.xid&&(X+=1,j.quantity=X,A=j),F.push(j)}),i.value=F;var y=new Audio(V.value.beep_audio_url);y.play(),P.orderSearchTerm=void 0,P.products=[],L(A)}else P.orderSearchTerm=void 0,P.products=[],re.error(b("common.out_of_stock"))}else{u.value.push(s.xid),i.value.push({...s,sn:i.value.length+1,unit_price:q(s.unit_price),tax_amount:q(s.tax_amount),subtotal:q(s.subtotal)}),P.orderSearchTerm=void 0,P.products=[],Z();var y=new Audio(V.value.beep_audio_url);y.play()}},x=s=>{var y=parseFloat(s.quantity),A=parseFloat(s.stock_quantity);const M=parseFloat(s.unit_price);s.product_type!="service"&&(y=y>A?A:y);const F=s.discount_rate,vt=F>0?F/100*M:0,j=M-vt;var X=0,ht=j,lt=M;return s.tax_rate>0&&(s.tax_type=="inclusive"?(lt=j*100/(100+s.tax_rate),X=lt*(s.tax_rate/100)):(X=j*(s.tax_rate/100),ht=j+X,lt=j)),{...s,total_discount:vt*y,subtotal:ht*y,quantity:y,total_tax:X*y,max_quantity:A,single_unit_price:lt}},L=s=>{const y=[];i.value.map(A=>{if(A.xid==s.xid){const M=x(s);y.push(M)}else y.push(A)}),i.value=y,Z()},Z=()=>{let s=0;i.value.map(F=>{s+=F.subtotal});var y=0;m.value.discount_type=="percentage"?y=m.value.discount_value!=""?parseFloat(m.value.discount_value)*s/100:0:m.value.discount_type=="fixed"&&(y=m.value.discount_value!=""?parseFloat(m.value.discount_value):0);const A=m.value.tax_rate!=""?parseFloat(m.value.tax_rate):0;s=s-y;const M=s*(A/100);s=s+parseFloat(m.value.shipping),m.value.subtotal=q(s+M),m.value.tax_amount=q(M),m.value.discount=y},It=s=>{const y=[];let A=1;i.value.map(F=>{F.item_id!=null&&(R.value=[...R.value,F.item_id]),F.xid!=s.xid&&(y.push({...F,sn:A,single_unit_price:q(F.single_unit_price),tax_amount:q(F.tax_amount),subtotal:q(F.subtotal)}),A++)}),i.value=y;const M=u.value.filter(F=>F!=s.xid);u.value=M,Z()},Et=(s,y)=>{m.value.tax_rate=s==null?0:y.tax.rate,Z()},qt=s=>{U.value={id:s.xid,discount_rate:s.discount_rate,unit_price:s.unit_price,tax_id:s.x_tax_id,tax_type:s.tax_type==null?void 0:s.tax_type},B.value=!0,J.value=s.name},Rt=()=>{H.value=!0},Ut=()=>{H.value=!1},ut=()=>{i.value=[],u.value=[],m.value={...m.value,tax_id:void 0,category_id:void 0,brand_id:void 0,tax_id:void 0,tax_rate:0,tax_amount:0,discount_value:0,discount:0,shipping:0,subtotal:0},Z()},Mt=()=>{const s=i.value.filter(F=>F.xid==U.value.id),y=o.value.filter(F=>F.xid==U.value.tax_id),A=U.value.tax_type!=null?U.value.tax_type:"exclusive",M={...s[0],discount_rate:parseFloat(U.value.discount_rate),unit_price:parseFloat(U.value.unit_price),tax_id:U.value.tax_id,tax_rate:y[0]?y[0].rate:0,tax_type:A};L(M),yt()},yt=()=>{U.value={},B.value=!1},Nt=()=>{axiosAdmin.get(c).then(s=>{l.value=s.data})},Tt=s=>{ut();var y=E.value&&E.value.xid?E.value.xid:void 0;m.value={...m.value,user_id:y},tt(),H.value=!1,Y.value=s,$.value=!0};return{taxes:o,customers:l,categories:t,brands:v,productLists:N,formData:m,reFetchProducts:tt,selectSaleProduct:n,taxChanged:Et,quantityChanged:L,recalculateFinalTotal:Z,viewQuote:()=>{const s={product_items:i.value,details:m.value,order_type:"quotations"};O({url:"pos/save",data:s,successMessage:b("stock.quote_saved"),success:y=>{Y.value=y.order,$.value=!0,ut()}})},payNow:Rt,payNowVisible:H,payNowClosed:Ut,resetPos:ut,appSetting:V,permsArray:K,...ue(P),fetchProducts:st,searchValueSelected:nt,selectedProducts:i,orderItemColumns:W,formatAmount:q,formatAmountCurrency:T,containerStyle:{height:window.innerHeight-110+"px",overflow:"scroll","overflow-y":"scroll"},customerAdded:Nt,editItem:qt,addEditVisible:B,addEditFormData:U,addEditFormSubmitting:S,addEditRules:G,addEditPageTitle:J,onAddEditSubmit:Mt,onAddEditClose:yt,taxTypes:C,showDeleteConfirm:It,payNowSuccess:Tt,printInvoiceModalVisible:$,printInvoiceOrder:Y,postLayout:Q,innerWidth:window.innerWidth,inputValueChanged:rt,showMobileCart:at}}},Ze={style:{display:"flex"}},Ge={key:0},Je={class:"pos-left-wrapper"},$e={class:"pos-left-header"},ta={class:"bill-filters"},ea={style:{display:"flex"}},aa={key:0},oa={style:{display:"flex"}},na={class:"pos-left-content"},la={class:"bill-body"},da={class:"bill-table"},ia={key:0},sa={class:"pos-left-footer"},ra={class:"bill-footer"},ua={style:{right:0,bottom:20,width:"100%",padding:"10px 16px",background:"#fff",textAlign:"right",zIndex:1}},ma={class:"pos-grand-total"},ca={class:"pos-grand-total"},pa={style:{display:"flex"}},_a={class:"pos1-left-wrapper"},fa={key:0,class:"pos-left-header"},ga={key:1,class:"pos-left-content"},ya={key:2},va={key:0},ha={key:3,class:"pos-left-footer"},xa={class:"bill-footer",style:{paddingBotton:"30px"}},ba={key:0,class:"pos-mobile-footer"},ka={class:"pos-grand-total"};function Ca(o,l,v,t,N,W){const m=gt,c=ft,h=I("CustomerAddButton"),E=Jt,i=it,u=dt,R=$t,Q=I("SearchOutlined"),P=te,q=ee,T=ae,V=I("EditOutlined"),C=wt,K=I("DeleteOutlined"),O=Dt,b=At,B=Pt,S=oe,U=I("PosLayout1"),G=I("PosLayout2"),J=I("ProductCardNew"),H=ne,$=I("perfect-scrollbar"),Y=I("ShoppingCartOutlined"),at=I("UnorderedListOutlined"),tt=St,st=I("SaveOutlined"),ot=le,rt=I("PayNow"),nt=I("InvoiceModal");return d(),f(D,null,[a(R,{class:"page-content-sub-header breadcrumb-left-border",bodyStyle:{padding:"0px",margin:"0px 16px 0"}},{default:e(()=>[a(u,null,{default:e(()=>[a(i,{span:24},{default:e(()=>[a(E,{title:o.$t("menu.pos"),onBack:l[1]||(l[1]=()=>o.$router.go(-1)),class:"p-0"},mt({_:2},[t.innerWidth<=768?{name:"extra",fn:e(()=>[g("span",Ze,[a(c,{value:t.formData.user_id,"onUpdate:value":l[0]||(l[0]=n=>t.formData.user_id=n),placeholder:o.$t("user.walk_in_customer"),style:{width:"100%"},optionFilterProp:"title","show-search":""},{default:e(()=>[(d(!0),f(D,null,z(t.customers,n=>(d(),_(m,{key:n.xid,title:n.name,value:n.xid},{default:e(()=>[p(r(n.name)+" ",1),n.phone&&n.phone!=""?(d(),f("span",Ge,[l[24]||(l[24]=g("br",null,null,-1)),p(" "+r(n.phone),1)])):w("",!0)]),_:2},1032,["title","value"]))),128))]),_:1},8,["value","placeholder"]),a(h,{onOnAddSuccess:t.customerAdded},null,8,["onOnAddSuccess"])])]),key:"0"}:void 0]),1032,["title"])]),_:1})]),_:1})]),_:1}),a(tt,{layout:"vertical"},{default:e(()=>[t.innerWidth>=768?(d(),_(u,{key:0,gutter:[8,8],class:"mt-5",style:{margin:"10px 16px 0"}},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:10,xl:10},{default:e(()=>[g("div",Je,[g("div",$e,[a(R,{class:"left-pos-top",style:{marginBottom:"10px"}},{default:e(()=>[g("div",ta,[a(u,{gutter:16},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:24,xl:24},{default:e(()=>[g("span",ea,[a(c,{value:t.formData.user_id,"onUpdate:value":l[2]||(l[2]=n=>t.formData.user_id=n),placeholder:o.$t("user.walk_in_customer"),style:{width:"100%"},optionFilterProp:"title","show-search":""},{default:e(()=>[(d(!0),f(D,null,z(t.customers,n=>(d(),_(m,{key:n.xid,title:n.name,value:n.xid},{default:e(()=>[p(r(n.name)+" ",1),n.phone&&n.phone!=""?(d(),f("span",aa,[l[25]||(l[25]=g("br",null,null,-1)),p(" "+r(n.phone),1)])):w("",!0)]),_:2},1032,["title","value"]))),128))]),_:1},8,["value","placeholder"]),a(h,{onOnAddSuccess:t.customerAdded},null,8,["onOnAddSuccess"])])]),_:1})]),_:1}),a(u,{class:"mt-20 mb-30"},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:24,xl:24},{default:e(()=>[g("span",oa,[a(c,{value:null,searchValue:o.orderSearchTerm,"show-search":"","filter-option":!1,placeholder:o.$t("product.search_scan_product"),style:{width:"100%"},"not-found-content":o.productFetching?void 0:null,onSearch:l[3]||(l[3]=n=>{o.orderSearchTerm=n,t.fetchProducts(n)}),"option-label-prop":"label",onFocus:l[4]||(l[4]=n=>o.products=[]),onSelect:t.searchValueSelected,onInputKeyDown:t.inputValueChanged},mt({suffixIcon:e(()=>[a(Q)]),default:e(()=>[(d(!0),f(D,null,z(o.products,n=>(d(),_(m,{key:n.xid,value:n.xid,label:n.name,product:n},{default:e(()=>[p(" => "+r(n.name),1)]),_:2},1032,["value","label","product"]))),128))]),_:2},[o.productFetching?{name:"notFoundContent",fn:e(()=>[a(P,{size:"small"})]),key:"0"}:void 0]),1032,["searchValue","placeholder","not-found-content","onSelect","onInputKeyDown"])])]),_:1})]),_:1})])]),_:1})]),g("div",na,[a(R,{class:"left-pos-middle-table",style:{marginBottom:"10px"}},{default:e(()=>[g("div",la,[g("div",da,[a(u,{class:"mt-20 mb-30"},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:24},{default:e(()=>[a(O,{"row-key":n=>n.xid,dataSource:t.selectedProducts,columns:t.orderItemColumns,pagination:!1,size:"middle"},{bodyCell:e(({column:n,record:x})=>[n.dataIndex==="name"?(d(),f(D,{key:0},[p(r(x.name)+" ",1),l[26]||(l[26]=g("br",null,null,-1)),x.product_type!="service"?(d(),f("small",ia,[a(q,{code:""},{default:e(()=>[p(r(o.$t("product.avl_qty"))+" "+r(`${x.stock_quantity}${x.unit_short_name}`),1)]),_:2},1024)])):w("",!0)],64)):w("",!0),n.dataIndex==="unit_quantity"?(d(),_(T,{key:1,id:"inputNumber",value:x.quantity,"onUpdate:value":L=>x.quantity=L,min:0,onChange:L=>t.quantityChanged(x)},null,8,["value","onUpdate:value","onChange"])):w("",!0),n.dataIndex==="subtotal"?(d(),f(D,{key:2},[p(r(t.formatAmountCurrency(x.subtotal)),1)],64)):w("",!0),n.dataIndex==="action"?(d(),f(D,{key:3},[a(C,{type:"primary",onClick:L=>t.editItem(x),style:{"margin-left":"4px","margin-top":"4px"}},{icon:e(()=>[a(V)]),_:1},8,["onClick"]),a(C,{type:"primary",onClick:L=>t.showDeleteConfirm(x),style:{"margin-left":"4px","margin-top":"4px"}},{icon:e(()=>[a(K)]),_:1},8,["onClick"])],64)):w("",!0)]),_:1},8,["row-key","dataSource","columns"])]),_:1})]),_:1})])])]),_:1})]),g("div",sa,[a(R,null,{default:e(()=>[g("div",ra,[a(u,{gutter:[16,16]},{default:e(()=>[a(i,{xs:24,sm:24,md:8,lg:8,xl:8},{default:e(()=>[a(b,{label:o.$t("stock.order_tax")},{default:e(()=>[a(c,{value:t.formData.tax_id,"onUpdate:value":l[5]||(l[5]=n=>t.formData.tax_id=n),placeholder:o.$t("common.select_default_text",[o.$t("stock.order_tax")]),allowClear:!0,style:{width:"100%"},onChange:t.taxChanged},{default:e(()=>[(d(!0),f(D,null,z(t.taxes,n=>(d(),_(m,{key:n.xid,value:n.xid,tax:n},{default:e(()=>[p(r(n.name)+" ("+r(n.rate)+"%) ",1)]),_:2},1032,["value","tax"]))),128))]),_:1},8,["value","placeholder","onChange"])]),_:1},8,["label"])]),_:1}),a(i,{xs:24,sm:24,md:8,lg:8,xl:8},{default:e(()=>[a(b,{label:o.$t("stock.discount")},{default:e(()=>[a(B,{compact:""},{default:e(()=>[a(c,{value:t.formData.discount_type,"onUpdate:value":l[6]||(l[6]=n=>t.formData.discount_type=n),onChange:t.recalculateFinalTotal,style:{width:"30%"}},{default:e(()=>[a(m,{value:"percentage"},{default:e(()=>[...l[27]||(l[27]=[p(" % ",-1)])]),_:1}),a(m,{value:"fixed"},{default:e(()=>[p(r(t.appSetting.currency.symbol),1)]),_:1})]),_:1},8,["value","onChange"]),a(T,{value:t.formData.discount_value,"onUpdate:value":l[7]||(l[7]=n=>t.formData.discount_value=n),placeholder:o.$t("common.placeholder_default_text",[o.$t("stock.discount")]),onChange:t.recalculateFinalTotal,min:"0",style:{width:"70%"}},null,8,["value","placeholder","onChange"])]),_:1})]),_:1},8,["label"])]),_:1}),a(i,{xs:24,sm:24,md:8,lg:8,xl:8},{default:e(()=>[a(b,{label:o.$t("stock.shipping")},{default:e(()=>[a(T,{value:t.formData.shipping,"onUpdate:value":l[8]||(l[8]=n=>t.formData.shipping=n),placeholder:o.$t("common.placeholder_default_text",[o.$t("stock.shipping")]),onChange:t.recalculateFinalTotal,min:"0",style:{width:"100%"}},{addonBefore:e(()=>[p(r(t.appSetting.currency.symbol),1)]),_:1},8,["value","placeholder","onChange"])]),_:1},8,["label"])]),_:1})]),_:1})])]),_:1}),g("div",ua,[a(u,{gutter:16},{default:e(()=>[a(i,{xs:24,sm:24,md:10,lg:10,xl:10},{default:e(()=>[a(u,{gutter:16,style:{background:"#dbdbdb",padding:"5px"}},{default:e(()=>[a(i,{xs:24,sm:24,md:12,lg:12,xl:12},{default:e(()=>[g("span",ma,r(o.$t("stock.grand_total"))+" : ",1)]),_:1}),a(i,{xs:24,sm:24,md:12,lg:12,xl:12},{default:e(()=>[g("span",ca,r(t.formatAmountCurrency(t.formData.subtotal)),1)]),_:1})]),_:1})]),_:1}),a(i,{xs:24,sm:24,md:6,lg:6,xl:6,class:"mt-10"},{default:e(()=>[g("small",null,r(o.$t("product.tax"))+" : "+r(t.formatAmountCurrency(t.formData.tax_amount))+" | "+r(o.$t("product.discount"))+" : "+r(t.formatAmountCurrency(t.formData.discount)),1)]),_:1}),a(i,{xs:24,sm:24,md:8,lg:8,xl:8},{default:e(()=>[a(S,null,{default:e(()=>[a(C,{onClick:t.viewQuote,type:"primary",disabled:t.formData.subtotal<=0||t.formData.user_id==null||t.formData.user_id==""||!t.formData.user_id},{default:e(()=>[p(r(o.$t("stock.quote")),1)]),_:1},8,["onClick","disabled"]),a(C,{type:"primary",onClick:t.payNow,disabled:t.formData.subtotal<=0||t.formData.user_id==null||t.formData.user_id==""||!t.formData.user_id},{default:e(()=>[p(r(o.$t("stock.pay_now")),1)]),_:1},8,["onClick","disabled"]),a(C,{onClick:t.resetPos},{default:e(()=>[p(r(o.$t("stock.reset")),1)]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})])])])]),_:1}),a(i,{class:"right-pos-sidebar",xs:24,sm:24,md:24,lg:14,xl:14},{default:e(()=>[a($,{options:{wheelSpeed:1,swipeEasing:!0,suppressScrollX:!0}},{default:e(()=>[t.postLayout==1?(d(),_(U,{key:0,brands:t.brands,categories:t.categories,formData:t.formData,onChanged:t.reFetchProducts},null,8,["brands","categories","formData","onChanged"])):(d(),_(G,{key:1,brands:t.brands,categories:t.categories,formData:t.formData,onChanged:t.reFetchProducts},null,8,["brands","categories","formData","onChanged"])),t.productLists.length>0?(d(),_(u,{key:2,gutter:30},{default:e(()=>[(d(!0),f(D,null,z(t.productLists,n=>(d(),_(i,{key:n.xid,xxl:6,lg:6,md:12,xs:24,onClick:x=>t.selectSaleProduct(n)},{default:e(()=>[a(J,{product:n,isAdded:t.selectedProducts.some(x=>x.xid===n.xid)},null,8,["product","isAdded"])]),_:2},1032,["onClick"]))),128))]),_:1})):(d(),_(u,{key:3},{default:e(()=>[a(i,{span:24},{default:e(()=>[a(H,{title:o.$t("stock.no_product_found"),style:{marginTop:"20%"}},null,8,["title"])]),_:1})]),_:1}))]),_:1})]),_:1})]),_:1})):(d(),_(u,{key:1,gutter:[8,8],class:"mt-5",style:{margin:"10px 16px 0"}},{default:e(()=>[a(i,{span:24},{default:e(()=>[g("span",pa,[a(c,{value:null,searchValue:o.orderSearchTerm,"show-search":"","filter-option":!1,placeholder:o.$t("product.search_scan_product"),style:{width:"90%"},"not-found-content":o.productFetching?void 0:null,onSearch:l[9]||(l[9]=n=>{o.orderSearchTerm=n,t.fetchProducts(n)}),"option-label-prop":"label",onFocus:l[10]||(l[10]=n=>o.products=[]),onSelect:t.searchValueSelected,onInputKeyDown:t.inputValueChanged},mt({suffixIcon:e(()=>[a(Q)]),default:e(()=>[(d(!0),f(D,null,z(o.products,n=>(d(),_(m,{key:n.xid,value:n.xid,label:n.name,product:n},{default:e(()=>[p(" => "+r(n.name),1)]),_:2},1032,["value","label","product"]))),128))]),_:2},[o.productFetching?{name:"notFoundContent",fn:e(()=>[a(P,{size:"small"})]),key:"0"}:void 0]),1032,["searchValue","placeholder","not-found-content","onSelect","onInputKeyDown"]),t.showMobileCart?(d(),_(C,{key:0,class:"ml-5",style:{width:"100%"},onClick:l[11]||(l[11]=()=>t.showMobileCart=!1),type:"primary"},{icon:e(()=>[a(Y)]),_:1})):(d(),_(C,{key:1,class:"ml-5",style:{width:"100%"},onClick:l[12]||(l[12]=()=>t.showMobileCart=!0),type:"primary"},{icon:e(()=>[a(at)]),_:1}))])]),_:1}),a(i,{span:24},{default:e(()=>[g("div",_a,[t.showMobileCart?w("",!0):(d(),f("div",fa,[t.postLayout==1?(d(),_(U,{key:0,brands:t.brands,categories:t.categories,formData:t.formData,onChanged:t.reFetchProducts},null,8,["brands","categories","formData","onChanged"])):(d(),_(G,{key:1,brands:t.brands,categories:t.categories,formData:t.formData,onChanged:t.reFetchProducts},null,8,["brands","categories","formData","onChanged"]))])),t.showMobileCart?w("",!0):(d(),f("div",ga,[t.productLists.length>0?(d(),_(u,{key:0,gutter:30,class:"pos1-products-lists"},{default:e(()=>[(d(!0),f(D,null,z(t.productLists,n=>(d(),_(i,{key:n.xid,xxl:8,lg:8,md:8,sm:12,xs:12,onClick:x=>t.selectSaleProduct(n)},{default:e(()=>[a(J,{product:n,isAdded:t.selectedProducts.some(x=>x.xid===n.xid)},null,8,["product","isAdded"])]),_:2},1032,["onClick"]))),128))]),_:1})):w("",!0)])),t.showMobileCart?(d(),f("div",ya,[a(u,{class:"mt-5 mb-5"},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:24},{default:e(()=>[a(O,{"row-key":n=>n.xid,dataSource:t.selectedProducts,columns:t.orderItemColumns,pagination:!1,size:"middle"},{bodyCell:e(({column:n,record:x})=>[n.dataIndex==="name"?(d(),f(D,{key:0},[p(r(x.name)+" ",1),l[28]||(l[28]=g("br",null,null,-1)),x.product_type!="service"?(d(),f("small",va,[a(q,{code:""},{default:e(()=>[p(r(o.$t("product.avl_qty"))+" "+r(`${x.stock_quantity}${x.unit_short_name}`),1)]),_:2},1024)])):w("",!0)],64)):w("",!0),n.dataIndex==="unit_quantity"?(d(),_(T,{key:1,id:"inputNumber",value:x.quantity,"onUpdate:value":L=>x.quantity=L,min:0,onChange:L=>t.quantityChanged(x)},null,8,["value","onUpdate:value","onChange"])):w("",!0),n.dataIndex==="subtotal"?(d(),f(D,{key:2},[p(r(t.formatAmountCurrency(x.subtotal)),1)],64)):w("",!0),n.dataIndex==="action"?(d(),f(D,{key:3},[a(C,{type:"primary",onClick:L=>t.editItem(x),style:{"margin-left":"4px","margin-top":"4px"}},{icon:e(()=>[a(V)]),_:1},8,["onClick"]),a(C,{type:"primary",onClick:L=>t.showDeleteConfirm(x),style:{"margin-left":"4px","margin-top":"4px"}},{icon:e(()=>[a(K)]),_:1},8,["onClick"])],64)):w("",!0)]),_:1},8,["row-key","dataSource","columns"])]),_:1})]),_:1})])):w("",!0),t.showMobileCart?(d(),f("div",ha,[a(R,null,{default:e(()=>[g("div",xa,[a(u,{gutter:[16]},{default:e(()=>[a(i,{xs:24,sm:24,md:8,lg:8},{default:e(()=>[a(b,{label:o.$t("stock.order_tax")},{default:e(()=>[a(c,{value:t.formData.tax_id,"onUpdate:value":l[13]||(l[13]=n=>t.formData.tax_id=n),placeholder:o.$t("common.select_default_text",[o.$t("stock.order_tax")]),allowClear:!0,style:{width:"100%"},onChange:t.taxChanged},{default:e(()=>[(d(!0),f(D,null,z(t.taxes,n=>(d(),_(m,{key:n.xid,value:n.xid,tax:n},{default:e(()=>[p(r(n.name)+" ("+r(n.rate)+"%) ",1)]),_:2},1032,["value","tax"]))),128))]),_:1},8,["value","placeholder","onChange"])]),_:1},8,["label"])]),_:1}),a(i,{xs:24,sm:24,md:8,lg:8},{default:e(()=>[a(b,{label:o.$t("stock.discount")},{default:e(()=>[a(B,{compact:""},{default:e(()=>[a(c,{value:t.formData.discount_type,"onUpdate:value":l[14]||(l[14]=n=>t.formData.discount_type=n),onChange:t.recalculateFinalTotal,style:{width:"30%"}},{default:e(()=>[a(m,{value:"percentage"},{default:e(()=>[...l[29]||(l[29]=[p(" % ",-1)])]),_:1}),a(m,{value:"fixed"},{default:e(()=>[p(r(t.appSetting.currency.symbol),1)]),_:1})]),_:1},8,["value","onChange"]),a(T,{value:t.formData.discount_value,"onUpdate:value":l[15]||(l[15]=n=>t.formData.discount_value=n),placeholder:o.$t("common.placeholder_default_text",[o.$t("stock.discount")]),onChange:t.recalculateFinalTotal,min:"0",style:{width:"70%"}},null,8,["value","placeholder","onChange"])]),_:1})]),_:1},8,["label"])]),_:1}),a(i,{xs:24,sm:24,md:8,lg:8},{default:e(()=>[a(b,{label:o.$t("stock.shipping")},{default:e(()=>[a(T,{value:t.formData.shipping,"onUpdate:value":l[16]||(l[16]=n=>t.formData.shipping=n),placeholder:o.$t("common.placeholder_default_text",[o.$t("stock.shipping")]),onChange:t.recalculateFinalTotal,min:"0",style:{width:"100%"}},{addonBefore:e(()=>[p(r(t.appSetting.currency.symbol),1)]),_:1},8,["value","placeholder","onChange"])]),_:1},8,["label"])]),_:1})]),_:1})])]),_:1})])):w("",!0)])]),_:1})]),_:1}))]),_:1}),t.innerWidth<=768?(d(),f("div",ba,[a(u,{gutter:16},{default:e(()=>[a(i,{span:10},{default:e(()=>[a(u,{gutter:16,style:{padding:"10px"}},{default:e(()=>[a(i,{span:24},{default:e(()=>[g("span",ka,r(o.$t("common.total"))+" : "+r(t.formatAmountCurrency(t.formData.subtotal)),1)]),_:1})]),_:1})]),_:1}),a(i,{span:14},{default:e(()=>[a(S,{style:{marginTop:"5px"}},{default:e(()=>[t.showMobileCart?(d(),_(C,{key:0,onClick:l[17]||(l[17]=()=>t.showMobileCart=!1),type:"primary"},{icon:e(()=>[a(Y)]),_:1})):(d(),_(C,{key:1,onClick:l[18]||(l[18]=()=>t.showMobileCart=!0),type:"primary"},{icon:e(()=>[a(at)]),_:1})),a(C,{onClick:t.viewQuote,type:"primary",disabled:t.formData.subtotal<=0||t.formData.user_id==null||t.formData.user_id==""||!t.formData.user_id},{default:e(()=>[p(r(o.$t("stock.quote")),1)]),_:1},8,["onClick","disabled"]),a(C,{type:"primary",onClick:t.payNow,disabled:t.formData.subtotal<=0||t.formData.user_id==null||t.formData.user_id==""||!t.formData.user_id},{default:e(()=>[p(r(o.$t("stock.pay_now")),1)]),_:1},8,["onClick","disabled"]),a(C,{onClick:t.resetPos},{default:e(()=>[p(r(o.$t("stock.reset")),1)]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})])):w("",!0),a(ot,{open:t.addEditVisible,closable:!1,centered:!0,title:t.addEditPageTitle,onOk:t.onAddEditSubmit},{footer:e(()=>[a(C,{key:"submit",type:"primary",loading:t.addEditFormSubmitting,onClick:t.onAddEditSubmit},{icon:e(()=>[a(st)]),default:e(()=>[p(" "+r(o.$t("common.update")),1)]),_:1},8,["loading","onClick"]),a(C,{key:"back",onClick:t.onAddEditClose},{default:e(()=>[p(r(o.$t("common.cancel")),1)]),_:1},8,["onClick"])]),default:e(()=>[a(tt,{layout:"vertical"},{default:e(()=>[a(u,{gutter:16},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:24},{default:e(()=>[a(b,{label:o.$t("product.unit_price"),name:"unit_price",help:t.addEditRules.unit_price?t.addEditRules.unit_price.message:null,validateStatus:t.addEditRules.unit_price?"error":null},{default:e(()=>[a(T,{value:t.addEditFormData.unit_price,"onUpdate:value":l[19]||(l[19]=n=>t.addEditFormData.unit_price=n),placeholder:o.$t("common.placeholder_default_text",[o.$t("product.unit_price")]),min:"0",style:{width:"100%"}},{addonBefore:e(()=>[p(r(t.appSetting.currency.symbol),1)]),_:1},8,["value","placeholder"])]),_:1},8,["label","help","validateStatus"])]),_:1})]),_:1}),a(u,{gutter:16},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:24},{default:e(()=>[a(b,{label:o.$t("product.discount"),name:"discount_rate",help:t.addEditRules.discount_rate?t.addEditRules.discount_rate.message:null,validateStatus:t.addEditRules.discount_rate?"error":null},{default:e(()=>[a(T,{value:t.addEditFormData.discount_rate,"onUpdate:value":l[20]||(l[20]=n=>t.addEditFormData.discount_rate=n),placeholder:o.$t("common.placeholder_default_text",[o.$t("product.discount")]),min:"0",style:{width:"100%"}},{addonAfter:e(()=>[...l[30]||(l[30]=[p("%",-1)])]),_:1},8,["value","placeholder"])]),_:1},8,["label","help","validateStatus"])]),_:1})]),_:1}),a(u,{gutter:16},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:24},{default:e(()=>[a(b,{label:o.$t("product.tax"),name:"tax_id",help:t.addEditRules.tax_id?t.addEditRules.tax_id.message:null,validateStatus:t.addEditRules.tax_id?"error":null},{default:e(()=>[a(c,{value:t.addEditFormData.tax_id,"onUpdate:value":l[21]||(l[21]=n=>t.addEditFormData.tax_id=n),placeholder:o.$t("common.select_default_text",[o.$t("product.tax")]),allowClear:!0},{default:e(()=>[(d(!0),f(D,null,z(t.taxes,n=>(d(),_(m,{key:n.xid,value:n.xid},{default:e(()=>[p(r(n.name)+" ("+r(n.rate)+"%) ",1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label","help","validateStatus"])]),_:1})]),_:1}),a(u,{gutter:16},{default:e(()=>[a(i,{xs:24,sm:24,md:24,lg:24},{default:e(()=>[a(b,{label:o.$t("product.tax_type"),name:"tax_type",help:t.addEditRules.tax_type?t.addEditRules.tax_type.message:null,validateStatus:t.addEditRules.tax_type?"error":null},{default:e(()=>[a(c,{value:t.addEditFormData.tax_type,"onUpdate:value":l[22]||(l[22]=n=>t.addEditFormData.tax_type=n),placeholder:o.$t("common.select_default_text",[o.$t("product.tax_type")]),allowClear:!0},{default:e(()=>[(d(!0),f(D,null,z(t.taxTypes,n=>(d(),_(m,{key:n.key,value:n.key},{default:e(()=>[p(r(n.value),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label","help","validateStatus"])]),_:1})]),_:1})]),_:1})]),_:1},8,["open","title","onOk"]),a(rt,{visible:t.payNowVisible,onClosed:t.payNowClosed,onSuccess:t.payNowSuccess,data:t.formData,selectedProducts:t.selectedProducts},null,8,["visible","onClosed","onSuccess","data","selectedProducts"]),a(nt,{visible:t.printInvoiceModalVisible,order:t.printInvoiceOrder,onClosed:l[23]||(l[23]=n=>t.printInvoiceModalVisible=!1)},null,8,["visible","order"])],64)}const Ka=et(Ye,[["render",Ca]]);export{Ka as default};
