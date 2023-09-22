const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'views');

app.use(express.static(publicPath));
app.use('/assests',express.static('assests'));
app.use('/static', express.static('node_modules'));

app.use('/assests/configuration',express.static('/assests/configuration'));
app.use('/assests/dapp operation',express.static('/assests/dapp operation'));
// Route for serving the 'meta.html' file
app.get('/meta', (_, resp) => {
  resp.sendFile(path.join(publicPath, 'meta.html'));
});

app.get('/realEstateNft.json', (req, res) => {
  const filePath = path.join(__dirname, 'assests', 'configuration', 'realEstateNft.json');
  res.sendFile(filePath);
});
// Custom route handler for the '/admin' route

app.set('view engine', 'ejs');

// Route for rendering the 'profile' view
app.get('/profile', (_, res) => {
  res.render('profile');
});
app.get('/admin', (_, res) => {
  res.render('admin');
});
app.get('/dealersales', (_, res) => {
  res.render('dealerSales');
});
app.get('/addnewdealer', (_, res) => {
  res.render('admin');
});
app.get('/home', (_, res) => {
  res.render('home');
});
app.get('/registerddealers', (_, res) => {
  res.render('registerddealer');
});

app.get('/dealer',(_,res)=>{

res.render('dealer');
});
app.get('/',(_,res)=>{

  res.render('home');
  });

  app.get('/verify-owner',(_,resp) =>
  {
resp.render('verifyowner');
  });

  app.get('/add-owner',(_,resp) =>
  {
resp.render('addowner');
  });

  app.get('/verify-nft',(_,resp) =>
  {
resp.render('verifynft');
  });

  app.get('/create-nft',(_,resp) =>
  {
resp.render('createnft');
  });
// Route for serving the 'errorr.html' file
// app.get('*', (_, resp) => {
//   resp.sendFile(path.join(publicPath, 'errorr.html'));
// });

app.get('/nft-data',(_,resp)=>
{
  resp.render('nftValue');
}
);

app.get('/nft-owner',(_,resp)=>
{
  resp.render('nftOwner');
}
);

app.get('find-nft-id',(_,resp)=>
{
  resp.render('findNFTid');
}
);

app.get('/verify-buyer',(_,resp)=>
{
  resp.render('verifyBuyer');
}
);

app.get('/transfer-property',(_,resp)=>
{
  resp.render('transferProperty');
}
);

app.get('/my-properties',(_,resp)=>
{
  resp.render('myProperties');
}
);

app.get('/my-profile',(_,resp)=>
{
  resp.render('myProfile');
}
);
app.get('/owner',(_,resp)=>
{
  resp.render('owner');
}
);

app.get('/public',(_,resp)=>
{
  resp.render('nftOwner');
}
);
app.get('/registerddealer', (_, res) => {
  res.render('dlist');
});
app.get('/dealersale', (_, res) => {
  res.render('dsales');
});
app.get('/get-nftID', (_, res) => {
  res.render('findNFTid');
});

app.get('/my-property', (_, res) => {
  res.render('myProperties');
});
app.get('/transfer-nft', (_, res) => {
  res.render('transferProperty');
});
app.get('/verify-bueyrr', (_, res) => {
  res.render('verifyBuyer');
});
app.get('/my-profile', (_, res) => {
  res.render('myProfile');
});
app.get('/metamask',(_,resp)=>
{
  resp.render('metamask');
}
);
app.listen(5050);

