(this.webpackJsonpjammming=this.webpackJsonpjammming||[]).push([[0],[,,,,,,,,,,,,,,function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var n,s=a(0),c=a(1),r=a.n(c),i=a(8),o=a.n(i),l=(a(14),a(3)),h=a(4),u=a(2),d=a(6),p=a(5),m=(a(15),a(16),function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).state={term:""},n.search=n.search.bind(Object(u.a)(n)),n.handleTermChange=n.handleTermChange.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"search",value:function(){this.props.onSearch(this.state.term)}},{key:"handleTermChange",value:function(t){this.setState({term:t.target.value})}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"SearchBar",children:[Object(s.jsx)("input",{placeholder:"Enter A Song, Album, or Artist",onChange:this.handleTermChange}),Object(s.jsx)("button",{className:"SearchButton",onClick:this.search,children:"SEARCH"})]})}}]),a}(r.a.Component)),j=(a(17),a(18),a(19),function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).addTrack=n.addTrack.bind(Object(u.a)(n)),n.removeTrack=n.removeTrack.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"renderAction",value:function(){return this.props.isRemoval?Object(s.jsx)("button",{className:"Track-action",onClick:this.removeTrack,children:"-"}):Object(s.jsx)("button",{className:"Track-action",onClick:this.addTrack,children:"+"})}},{key:"addTrack",value:function(){this.props.onAdd(this.props.track)}},{key:"removeTrack",value:function(){this.props.onRemove(this.props.track)}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"Track",children:[Object(s.jsxs)("div",{className:"Track-information",children:[Object(s.jsx)("h3",{children:this.props.track.name}),Object(s.jsxs)("p",{children:[this.props.track.artist," | ",this.props.track.album]})]}),this.renderAction()]})}}]),a}(r.a.Component)),b=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(){return Object(l.a)(this,a),e.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){var t=this;return Object(s.jsx)("div",{className:"TrackList",children:this.props.tracks.map((function(e){return Object(s.jsx)(j,{track:e,onAdd:t.props.onAdd,onRemove:t.props.onRemove,isRemoval:t.props.isRemoval},e.id)}))})}}]),a}(r.a.Component),v=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(){return Object(l.a)(this,a),e.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return Object(s.jsxs)("div",{className:"SearchResults",children:[Object(s.jsx)("h2",{children:"Search Results"}),Object(s.jsx)(b,{tracks:this.props.searchResults,onAdd:this.props.onAdd,isRemoval:!1})]})}}]),a}(r.a.Component),f=(a(20),function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).handleNameChange=n.handleNameChange.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"handleNameChange",value:function(t){this.props.onNameChange(t.target.value)}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"Playlist",children:[Object(s.jsx)("input",{defaultValue:"New Playlist",onChange:this.handleNameChange}),Object(s.jsx)(b,{tracks:this.props.playlistTracks,onRemove:this.props.onRemove,isRemoval:!0}),Object(s.jsx)("button",{className:"Playlist-save",onClick:this.props.onSave,children:"SAVE TO SPOTIFY"})]})}}]),a}(r.a.Component)),k={getAccessToken:function(){if(n)return n;var t=window.location.href.match(/access_token=([^&]*)/),e=window.location.href.match(/expires_in=([^&]*)/);if(t&&e){n=t[1];var a=Number(e[1]);return window.setTimeout((function(){return n=""}),1e3*a),window.history.pushState("Access Token",null,"/"),n}var s="https://accounts.spotify.com/authorize?client_id=".concat("9292dc64213a4ed58151523d8f69a063","&response_type=token&scope=playlist-modify-public&redirect_uri=").concat("http://CGTones.github.io/Audioslate");window.location=s},search:function(t){var e=k.getAccessToken();return fetch("https://api.spotify.com/v1/search?type=track&q=".concat(t),{headers:{Authorization:"Bearer ".concat(e)}}).then((function(t){return t.json()})).then((function(t){return t.tracks?t.tracks.items.map((function(t){return{id:t.id,name:t.name,artist:t.artists[0].name,album:t.album.name,uri:t.uri}})):[]}))},savePlaylist:function(t,e){if(t&&e.length){var a,n=k.getAccessToken(),s={Authorization:"Bearer ".concat(n)};return fetch("https://api.spotify.com/v1/me",{headers:s}).then((function(t){return t.json()})).then((function(n){return a=n.id,fetch("https://api.spotify.com/v1/users/".concat(a,"/playlists"),{headers:s,method:"POST",body:JSON.stringify({name:t})}).then((function(t){return t.json()})).then((function(t){var n=t.id;return fetch("https://api.spotify.com/v1/users/".concat(a,"/playlists/").concat(n,"/tracks"),{headers:s,method:"POST",body:JSON.stringify({uris:e})})}))}))}}},y=k,O=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).state={searchResults:[],playlistName:"playlist-one",playlistTracks:[]},n.addTrack=n.addTrack.bind(Object(u.a)(n)),n.removeTrack=n.removeTrack.bind(Object(u.a)(n)),n.updatePlaylistName=n.updatePlaylistName.bind(Object(u.a)(n)),n.savePlaylist=n.savePlaylist.bind(Object(u.a)(n)),n.search=n.search.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"addTrack",value:function(t){var e=this.state.playlistTracks;e.find((function(e){return e.id===t.id}))||(e.push(t),this.setState({playlistTracks:e}))}},{key:"removeTrack",value:function(t){var e=this.state.playlistTracks;e=e.filter((function(e){return e.id!==t.id})),this.setState({playlistTracks:e})}},{key:"updatePlaylistName",value:function(t){this.setState({playlistName:t})}},{key:"savePlaylist",value:function(){var t=this,e=this.state.playlistTracks.map((function(t){return t.uri}));y.savePlaylist(this.state.playlistName,e).then((function(){t.setState({playlistName:"New Playlist",playlistTracks:[]})}))}},{key:"search",value:function(t){var e=this;y.search(t).then((function(t){e.setState({searchResults:t})}))}},{key:"render",value:function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"AUDIO \ud83c\udfa7 SLATE"}),Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(m,{onSearch:this.search}),Object(s.jsxs)("div",{className:"App-playlist",children:[Object(s.jsx)(v,{searchResults:this.state.searchResults,onAdd:this.addTrack}),Object(s.jsx)(f,{playlistName:this.state.playlistName,playlistTracks:this.state.playlistTracks,onRemove:this.removeTrack,onNameChange:this.updatePlaylistName,onSave:this.savePlaylist})]})]})]})}}]),a}(r.a.Component),T=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,22)).then((function(e){var a=e.getCLS,n=e.getFID,s=e.getFCP,c=e.getLCP,r=e.getTTFB;a(t),n(t),s(t),c(t),r(t)}))};o.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(O,{})}),document.getElementById("root")),T()}],[[21,1,2]]]);
//# sourceMappingURL=main.98ab312e.chunk.js.map