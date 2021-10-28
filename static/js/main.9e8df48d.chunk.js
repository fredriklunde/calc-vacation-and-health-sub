(this["webpackJsonpcalc-vacation-and-health-sub"]=this["webpackJsonpcalc-vacation-and-health-sub"]||[]).push([[0],{154:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(22),i=a.n(r),c=a(97),l=a(98),h=a(51),u=a(104),o=a(103),d=a(99),b=a.n(d),j=a(82),g=a.n(j),m=a(175),O=a(176),D=a(177),f=a(48),x=a(171),y=a(173),v=a(172),k=function(e){var t=p(e),a=S(e.getFullYear())-t+1;return Math.round(a/S(e.getFullYear())*5e3)},Y=function(e,t){var a,s=new Date(e.getFullYear()-1,3,1);return e.getMonth()>=3&&(s=new Date(e.getFullYear(),3,1)),a=function(e,t,a){var s=Math.ceil((e-t)/864e5),n=S(t.getFullYear()+1),r=n-s,i=Math.ceil(r*a/n);return i<=0?0:i}(e,s,t),a};function C(e){return e%400===0||e%100!==0&&e%4===0}var S=function(e){return C(e)?366:365},p=function(e){return Math.ceil((e-new Date(e.getFullYear(),0,1))/864e5)},V=a(6),F={width:200,height:200},P=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={startingDate:null,numberOfPaidVacationDays:25,healtCareSubThisYear:0,vacationDaysNextPeriod:0,message:null},s.onDateChange=s.onDateChange.bind(Object(h.a)(s)),s.onNumberOfPaidVacationDaysChange=s.onNumberOfPaidVacationDaysChange.bind(Object(h.a)(s)),s}return Object(l.a)(a,[{key:"setHealthCareSub",value:function(e){this.setState({healtCareSubThisYear:k(e)})}},{key:"setVactationDays",value:function(e){this.setState({vacationDaysNextPeriod:Y(e,this.state.numberOfPaidVacationDays)})}},{key:"setMessage",value:function(e){this.setState({message:e})}},{key:"onNumberOfPaidVacationDaysChange",value:function(e){this.setState({numberOfPaidVacationDays:e.target.value}),this.state.startingDate&&this.setVactationDays(this.state.startingDate)}},{key:"onDateChange",value:function(e){e&&(this.setState({startingDate:e}),this.setHealthCareSub(e),this.setVactationDays(e),this.setMessage("Framtida \xe5r / perioder kommer att vara ber\xe4ttigade fullt bidrag och fullt antal semesterdagar."))}},{key:"renderMessage",value:function(){if(this.state.message)return Object(V.jsx)("p",{className:"ui info message",children:this.state.message})}},{key:"renderVacationDaysText",value:function(){if(this.state.startingDate){var e=function(e){var t=new Date(e.getFullYear(),3,1);return e.getMonth()>=3&&(t=new Date(e.getFullYear()+1,3,1)),t.getFullYear()}(this.state.startingDate);return Object(V.jsxs)(m.a,{as:"h4",textAlign:"center",children:["Intj\xe4nade semesterdagar period 1/4/",e," - 31/3/",e+1]})}}},{key:"renderInfoBlobs",value:function(){if(this.state.startingDate)return Object(V.jsxs)(O.a,{stackable:!0,columns:3,children:[Object(V.jsxs)(O.a.Column,{children:[Object(V.jsx)(D.a,{circular:!0,style:F,children:Object(V.jsxs)(m.a,{as:"h3",icon:!0,children:[Object(V.jsx)(f.a,{name:"angle right"}),"Startdatum!",Object(V.jsxs)(m.a.Subheader,{children:[" ",this.state.startingDate?g()(this.state.startingDate).format("YYYY-MM-DD"):""]})]})}),Object(V.jsx)(m.a,{as:"h4",textAlign:"center",children:"Ber\xe4kningen baseras p\xe5 ditt startdatum"})]}),Object(V.jsxs)(O.a.Column,{children:[Object(V.jsx)(D.a,{circular:!0,style:F,children:Object(V.jsxs)(m.a,{as:"h3",icon:!0,children:[Object(V.jsx)(f.a,{name:"heart"}),"Friskv\xe5rdsbidrag",Object(V.jsx)(m.a.Subheader,{children:this.state.healtCareSubThisYear})]})}),Object(V.jsxs)(m.a,{as:"h4",textAlign:"center",children:["Friskv\xe5rdsbidrag ",g()(this.state.startingDate).format("YYYY")]})]}),Object(V.jsxs)(O.a.Column,{children:[Object(V.jsx)(D.a,{circular:!0,style:F,children:Object(V.jsxs)(m.a,{as:"h3",icon:!0,children:[Object(V.jsx)(f.a,{name:"sun"}),"Semesterdagar",Object(V.jsx)(m.a.Subheader,{children:this.state.vacationDaysNextPeriod})]})}),this.renderVacationDaysText()]})]})}},{key:"render",value:function(){return Object(V.jsxs)(x.a,{text:!0,style:{margin:20},children:[Object(V.jsx)(m.a,{as:"h1",children:"Friskv\xe5rdsbidragsutr\xe4knare"}),Object(V.jsx)("p",{children:"Applikationen r\xe4knar ut hur mycket semester du hinner jobba in till n\xe4sta semester\xe5r, samt hur mycket Friskv\xe5rdsbidrag du har r\xe4tt till under kalender\xe5ret du blev anst\xe4lld."}),Object(V.jsx)(m.a,{as:"h5",children:"V\xe4lj startdatum"}),Object(V.jsx)(b.a,{onChange:this.onDateChange,value:this.state.startingDate}),Object(V.jsx)(m.a,{as:"h5",children:"Antal semesterdagar"}),Object(V.jsx)(y.a,{label:{basic:!0,content:"Dagar"},labelPosition:"right",type:"number",size:"mini",value:this.state.numberOfPaidVacationDays,name:"quantity",min:"25",placeholder:this.state.numberOfPaidVacationDays,onChange:this.onNumberOfPaidVacationDaysChange}),Object(V.jsx)(v.a,{}),this.renderInfoBlobs(),this.renderMessage()]})}}]),a}(n.a.Component);a(153);i.a.render(Object(V.jsx)(P,{}),document.querySelector("#root"))}},[[154,1,2]]]);
//# sourceMappingURL=main.9e8df48d.chunk.js.map