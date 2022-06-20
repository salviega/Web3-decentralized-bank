import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { FormControl, FormGroup } from '@angular/forms';

import addresses from '../../environment/contract-address.json';
import Bank from '../../blockchain/artifacts/blockchain/contracts/bank.sol/Bank.json';
import Token from '../../blockchain/artifacts/blockchain/contracts/token.sol/Token.json';

declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public depositForm: FormGroup;
  public withdrawForm: FormGroup;
  
  public signer: any;

  public bankContract: any;
  public tokenContract: any;

  public userTotalAssets: any;
  public usertTotalToken: any;
  public totalAsserts: any;
  public signerAddress: any;

  constructor() {
     this.depositForm = new FormGroup({
       DepositAmount: new FormControl()
     });
     this.withdrawForm = new FormGroup({
       WithdrawAmount: new FormControl()
     });
  }
  async ngOnInit() {
    
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    provider.on("network", (newNetwork: any, oldNewtwork: any) => {
      if (oldNewtwork) {
        window.Location.reload();
      }
    });

    this.signer = provider.getSigner();
    console.log(await this.signer)

    if(await this.signer.getChainId() !== 42) {
      alert("Please change your network to Kovan testnet!");
    }

    this.bankContract = new ethers.Contract(addresses.bankcontract, Bank.abi, this.signer);
    this.tokenContract = new ethers.Contract(addresses.tokencontract, Token.abi, this.signer);

    this.userTotalAssets = ethers.utils.formatEther(await this.bankContract.accounts(await this.signer.getAddress()));
    this.totalAsserts = ethers.utils.formatEther((await this.bankContract.totalAsserts()));
    this.usertTotalToken = ethers.utils.formatEther((await this.tokenContract.balanceOf((await this.signer.getAddress()))));
    this.signerAddress = await this.signer.getAddress();
  }

  async deposit() {
    const tx = await this.bankContract.deposit(
      {value: ethers.utils.parseEther(this.depositForm.value.DepositAmount.toString())});
    await tx.wait();

    this.depositForm.reset();
    window.location.reload();
  }

  async withdraw() {
    const tx = await this.bankContract.withdraw(
      ethers.utils.parseEther(this.withdrawForm.value.WithdrawAmount.toString()),
      addresses.tokencontract
    );
    await tx.wait();

    this.withdrawForm.reset();
    window.location.reload();
  }
}
