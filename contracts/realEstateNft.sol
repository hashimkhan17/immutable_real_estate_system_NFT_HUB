// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract realEstateNft is  ERC721URIStorage  {

address private real_admin;
// In constructor when contract deploy it hold main owner address

       constructor() ERC721("RealEstateNFT", "NFT") 
    {
      real_admin = msg.sender;
    }
//this is structure which hold the authorized dealer information
struct dealerData
{
address dealerEthereuem_address;
string frunchiseLocation;
uint256 frunchiseNo;

}

 uint private DealersConut;
dealerData [] private dealersList;

// i define this event for showing a message when a new dealer frunchise successfully get registerd
event NewDealerRegistered(uint256 frunchiseNo, address dealerEthereuem_address, string frunchiseLocation);
// In this function main owner insert the dealers data
function addNewDealer( uint256 _frunchiseNo, address _dealerEthereuem_address, string memory _frunchiseLocation) public isadmin
{
 bool afchecker = true;   
for(uint i=0; i<dealersList.length; i++)
if (_dealerEthereuem_address == dealersList[i].dealerEthereuem_address || 
    _frunchiseNo == dealersList[i].frunchiseNo ||
    keccak256(abi.encodePacked(_frunchiseLocation)) == keccak256(abi.encodePacked(bytes(dealersList[i].frunchiseLocation))))
{
    afchecker = false;
}
require(afchecker == true,"sorry this frunchose is already exist");

dealerData memory object =dealerData({
   frunchiseNo : _frunchiseNo,    
dealerEthereuem_address : _dealerEthereuem_address,
frunchiseLocation :  _frunchiseLocation

});
dealersList.push(object);
 DealersConut++;

// emit event 
emit NewDealerRegistered(_frunchiseNo, _dealerEthereuem_address, _frunchiseLocation);
    

}

// this function is for public who can see the registerd dealers 
function checkRegisterddealers() public view returns(dealerData[] memory)
{
    require(DealersConut !=0,"we are sorry currently no dealer is registerd");

dealerData[] memory id = new dealerData[](DealersConut);
      for (uint i = 0; i < DealersConut; i++) {
          dealerData storage dealerr = dealersList[i];
          id[i] = dealerr ;
      }
      return id;

}

// in this section modifers are defined for functions accessing 

modifier isadmin()
{
require(msg.sender ==real_admin ,'you are not authorized person');
_;

}

/// modifers for dealer authentication
modifier isVerfiedDealer(address ak)
{
bool ab= false;
    for(uint256 i=0;i<dealersList.length;i++)
 {
    if(ak == dealersList[i].dealerEthereuem_address)
     {
     ab = true;
 
     }
 }
require(ab==true,"sorry dear you are not authorized dealer");
_;
}

// Property related section
// this section include the struct which hold the plot related information
struct plotInformation
{
string housingsociety;
uint256 phase;
uint256 streetNo;
uint256 plotNo;
uint256 registryNo;
uint256 plotarea;
string landLocation;
string landnature;
}

plotInformation[] private plotdata;

//// this struct hold the property owner information which is going to buy the property

struct ownerInformation
{
string ownerName;
uint ownerCnic;
string owneraddress;
address ownerEthereumAddress;
}

ownerInformation[] private ownerdata;

// this function is for inserting property information but it 
// visibility is private which we acess through another function

function enterPlotData(string memory _housingsociety,
uint256 _phase,
uint256  _streetNo,
uint256 _plotNo,
uint256 _registryNo,
uint256  _plotarea,
string memory _landLocation,
string memory _landnature) private isVerfiedDealer(msg.sender)

{
 plotInformation  memory newData = plotInformation({
       housingsociety : _housingsociety,
phase : _phase,

streetNo : _streetNo,
plotNo : _plotNo,
registryNo : _registryNo,
plotarea : _plotarea,

landLocation : _landLocation,
landnature : _landnature

        }); 
    
plotdata.push(newData);
}

/// this function restricted only verified dealer will access 
// to this function

function enterOwnerDetails(string memory _ownerName,
uint _ownerCnic,
string memory _owneraddress,
address _ownerEthereumAddress) public isVerfiedDealer(msg.sender)
{
    bool compo = true;
   for(uint256 i=0;i<ownerdata.length;i++)
   {
if(_ownerCnic == ownerdata[i].ownerCnic || 
_ownerEthereumAddress == ownerdata[i].ownerEthereumAddress )
  {
     compo = false; 
  }
   }

require(compo == true,"reminder data against this person is already exist thanks");
  ownerInformation memory newData = ownerInformation({
           ownerName : _ownerName,
ownerCnic : _ownerCnic,
owneraddress : _owneraddress,
ownerEthereumAddress : _ownerEthereumAddress
        });
    
ownerdata.push(newData);
}
/// Nft counter initialization

   using Counters for Counters.Counter;
   Counters.Counter private tokenId;

mapping(uint => plotInformation) private project_overlord;

 mapping(uint256 => address) private _owners;

mapping(address => uint256 ) private dealersales;


uint private lap=0;

///this function is main minting function in which first 
// it is restricted for verifed dealers
// then in this we insert data related to property 
// more we check verification is buyer data exist or not
// and also we check is NFT already created or not
function createNFT(address properowner,string memory _housingsociety,uint _phase,
uint _streetNo,
uint _plotNo,
uint _registryNo,
uint  _plotarea,
string memory _landLocation,
string memory _landnature,string memory token_uri)   public isVerfiedDealer(msg.sender) returns(uint)
{  
    bool check = false;

    uint256 newTokenId;
 require(true==checkOwnerDataExist(properowner),"Owner data does not exist please first enter owner data");

check = checkAlreadyNftcreated(_registryNo);
if(check==true)
{
revert(" sorry this property Nft already exist");

}
else
{

tokenId.increment();
newTokenId = tokenId.current();

_mint(properowner, newTokenId);

_setTokenURI(newTokenId, token_uri);

enterPlotData( _housingsociety,_phase,_streetNo,_plotNo,_registryNo,_plotarea,_landLocation,_landnature);

project_overlord[newTokenId]= plotInformation(_housingsociety,_phase,_streetNo,_plotNo,_registryNo,_plotarea,_landLocation,_landnature);

_owners[newTokenId] = properowner;
dealersales[msg.sender] += 1;
lap++;
return newTokenId;
}
}

////this will function check owner data Exist

function checkOwnerDataExist(address ownerAddress) public view returns (bool) {
    bool check = false;

    for (uint256 i = 0; i < ownerdata.length; i++) {
        if (ownerAddress == ownerdata[i].ownerEthereumAddress) {
            check = true;
            break;  // Move the break statement inside the if block
        }
    }

    return check;
}

function checkAlreadyNftcreated(uint _registryNo) public view returns(bool st)
{
    bool check = false;
    for(uint256 i=0 ; i<=lap ; i++)
if( _registryNo == project_overlord[i].registryNo )   
{
    check = true;

}

return(check);

}

/// this function use for checking store value in Nft
function propertyNftStoreValue(uint NftId) public view returns(plotInformation memory)
{
return(project_overlord[NftId]);

}
   function ownerOfToken(uint256 eTokenId) public view returns(ownerInformation memory ph)
 {
        address owner = _ownerOf(eTokenId);

        require(owner != address(0), "invalid token ID");
     
for(uint256 i=0;i<ownerdata.length;i++)
if(owner==ownerdata[i].ownerEthereumAddress)

return(ownerdata[i]);

 }

/// this function is approving function only owner will access this

    //this is  buyer function for transfer of nft


function approve(address to, uint256 tokenIdf) public virtual  override(ERC721,IERC721) {
    address owner = ERC721.ownerOf(tokenIdf);
    require(to != owner, "Approval to current owner");

    require(
        _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
        "Approve caller is not token owner or approved for all"
    );

    _approve(to, tokenIdf);
}

function transferFrom(address from, address to, uint256 tokenIdf) public virtual override(ERC721,IERC721){
    require(checkOwnerDataExist(to), "Owner data does not exist, please first enter owner data");
    require(_isApprovedOrOwner(_msgSender(), tokenIdf), "Caller is not token owner or approved");

    _transfer(from, to, tokenIdf);
}
   function _isApprovedOrOwner(address spender, uint256 tokenIdp) internal view virtual override returns (bool) {
       
        address p_owner = ERC721.ownerOf(tokenIdp);
        return (spender == p_owner || isApprovedForAll(p_owner, spender) || getApproved(tokenIdp) == spender);
    }



// this function is created for checking owner of registry 
// by inserting property registry no

function ownerOF_Registry(uint regno) public view returns(ownerInformation memory ab)
{
   bool compare = false;

address owner;
    for(uint256 t=0 ; t<=lap ; t++)
    if(  regno == project_overlord[t].registryNo )  
       {
           owner = _ownerOf(t); 
           compare = true;
       }   

require(compare == true,"sorry there is no data exist against this registry no");

for(uint256 i=0;i<ownerdata.length;i++)
if(owner==ownerdata[i].ownerEthereumAddress)
return(ownerdata[i]);

}

// this function is checking property nft ID if you forget 
// by inserting property registry no

function check_NFTID(uint registrno) public view returns(uint256 count)
{
uint256 compare;
    for(uint256 c=0 ; c<=lap ; c++)
{
if(  registrno == project_overlord[c].registryNo ) 
 {
 compare = c;
 }
}
 require( compare !=0 , "there is no NFT minted against this registry number");
 return(compare);
 
}

// this function is created for checking how many plots are sell by specific dealer
// by inserting specific frunchise unique ID assgin to every dealer

function check_how_many_plot_sell_by_dealer(uint frunchiseNo1) public view returns(uint256 count)
    {
      address dealerethaddress;

    for(uint256 i=0;i<dealersList.length;i++)
 {
    if( frunchiseNo1 == dealersList[i].frunchiseNo )
     {
     dealerethaddress = dealersList[i].dealerEthereuem_address;
     }
 }

 require(dealersales[dealerethaddress] != 0, "there is no sales generated by this dealer");

return(dealersales[dealerethaddress]);

    }

//this function is used for getting location of property
// on google map

function getLocation(uint registrynumber) public view returns(string memory gps,ownerInformation memory kki)
{
string memory compare;
bool checker=false;

    for(uint256 c=0 ; c<=lap ; c++)
{
if(  registrynumber == project_overlord[c].registryNo) 
 {
   compare = project_overlord[c].landLocation;
   checker=true;
 }
}

require(checker==true,"this registry no does not exist");
ownerInformation memory ab;
ab = ownerOF_Registry(registrynumber);
 return(compare,ab);
}
function myProperties() public view returns (uint[] memory, plotInformation[] memory) {
    uint[] memory myTokenIds = new uint[](balanceOf(msg.sender));
    plotInformation[] memory myPropertyData = new plotInformation[](balanceOf(msg.sender));
    uint tokenCount = 0;
    for (uint i = 0; i <= lap; i++)
     {
        if (_owners[i] == msg.sender) {
            myTokenIds[tokenCount] = i;
            myPropertyData[tokenCount] = project_overlord[i];
            tokenCount++;
        }
     }
    return (myTokenIds, myPropertyData);
}
function getOwnerProfile() public view returns(ownerInformation memory) {
    address ownerAddr = msg.sender;
    ownerInformation memory ownerProfile;
    for (uint i = 0; i < ownerdata.length; i++) {
        if (ownerdata[i].ownerEthereumAddress == ownerAddr) {
            ownerProfile = ownerdata[i];
            break;
        }
    }
    return ownerProfile;
}
}