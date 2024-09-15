import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import secrets from './secrets.json'; 
import { CohereClient } from "cohere-ai";

function App() {
  const [investingAdvice, setInvestingAdvice] = useState(null);
  const [goal, setGoal] = useState(null);
  const [demon, setDemon] = useState(null);
  const DEMON_PROMPT = "Describe my greatest spending weakness in one sentence. For example, 'Exorbant spending on Starbucks drinks'."
  const GOAL_PROMPT = "Set a SMART financial goal for myself based on my finances. Maximum one sentence."
  const INVESTING_ADVICE_PROMPT = "Provide a brief specific suggestion about the amount I should know invest in my TFSA or RRSP. Maximum three sentences."
  const PREAMBLE = "You are a financial advisor at the most prestigious financial institution and sharing your knowledge with a youth that wants to get support with their budgeting and investing. Use your general knowledge, do not refer to the documents."

    // Define generateGoal as a function
  const generateAdvice = async () => {
    const cohere = new CohereClient({
      token: secrets.COHERE_API_KEY,
    });
  
    const response = await cohere.chat({
      message: INVESTING_ADVICE_PROMPT,
      model: "command-r-plus",
      preamble: PREAMBLE,
      documents: [
        {
          "id": "gov-tfsa-what-is",
          "title": "what-is",
          "snippet": "What is a TFSA\nThe TFSA program began in 2009. It is a way for individuals who are 18 years of age or older and who have a valid social insurance number (SIN) to set money aside tax-free throughout their lifetime.\n\nContributions to a TFSA are not deductible for income tax purposes. Any amount contributed as well as any income earned in the account (for example, investment income and capital gains) is generally tax-free, even when it is withdrawn.\n\nAdministrative or other fees in relation to a TFSA and any interest on money borrowed to contribute to a TFSA are not tax-deductible.\n\nTypes of TFSAs\nThere are three types of TFSAs that can be offered: a deposit, an annuity contract, and an arrangement in trust.\n\nBanks, insurance companies, credit unions, and trust companies can all issue TFSAs.\n\nFor more information about a certain type of TFSA, contact a TFSA issuer.\n\nWho can open a TFSA\nAny individual that is a resident of Canada who has a valid SIN and who is 18 years of age or older is eligible to open a TFSA.\n\nAny individual that is a non-resident of Canada who has a valid SIN and who is 18 years of age or older is also eligible to open a TFSA. However, any contributions made while a non-resident will be subject to a 1% tax for each month the contribution stays in the account. For more information, see “Non-residents of Canada”.\n\nYou cannot open a TFSA or contribute to one until you turn 18. However, when you turn 18, you will be able to contribute up to the full TFSA dollar limit for that year."
        },
        {
          "id": "gov-tfsa-open",
          "title": "open",
          "snippet": "How to open a TFSA\nYou can have more than one TFSA at any given time, but the total amount you contribute to your TFSAs cannot be more than your available TFSA contribution room for that year.\n\nTo open a TFSA, you must do both of the following:\n\nContact your financial institution, credit union, or insurance company (issuer).\nProvide the issuer with your SIN and date of birth so the issuer can register your qualifying arrangement as a TFSA. Your issuer could ask for supporting documents.\n\nNote\nIf you do not provide this information or provide incorrect information to your issuer, the registration of your TFSA can be denied. If your TFSA is not registered, any income that is earned will have to be reported on your income tax and benefit return."
        },
        {
          "id": "gov-tfsa-contributions",
          "title": "contributions",
          "snippet": "Self-directed TFSA\nYou can set up a self-directed TFSA if you prefer to build and manage your own investment portfolio by buying and selling different types of investments. For more information, contact a TFSA issuer.\n\nContributions \nYou do not need to have earned income to contribute to a TFSA. The maximum amount that you can contribute to your TFSA is limited by your TFSA contribution room.\n\nAll TFSA contributions made during the year, including the replacement or re-contribution of withdrawals made from a TFSA, will count against your contribution room.\n\nNote\nQualifying transfers, exempt contributions and specified distributions are not considered in the calculation of contribution room."
        },
        {
          "id": "gov-tfsa-contributions-cont",
          "title": "contributions-cont",
          "snippet": "At any time in the year, if you contribute more than your available TFSA contribution room you will have to pay a tax equal to 1% of the highest excess TFSA amount in the month, for each month that the excess amount stays in your account. For more information, see Tax payable on excess TFSA amount.\n\nAs the account holder, you are the only person who can do the following with your TFSA:\n\nmake contributions\nmake withdrawals\ndetermine how funds are invested\nYou can give your spouse or common-law partner money so that they can contribute to their own TFSA, and this amount or any earned income from that amount will not be allocated back to you. The total contributions you each make to your own TFSAs cannot be more than your TFSA contribution room. For more information, see TFSA contribution room.\n\nManagement fees related to a TFSA trust and paid by the holder are not considered to be contributions to the TFSA. The payment of investment counsel, transfer, or other fees by a TFSA trust will not result in a distribution (withdrawal) from the TFSA trust.\n\n"
        },
        {
          "id": "gov-tfsa-contributions-room",
          "snippet": "TFSA contribution room\nYour TFSA contribution room is the maximum amount that you can contribute to your TFSA.\n\nOnly contributions made under a valid SIN are accepted as TFSA contributions.\n\nIf you were 18 or older in 2009, your TFSA contribution room grows each year even if you do not file an income tax and benefit return or open a TFSA.\n\nIf you turned 18 after 2009, your TFSA contribution room starts in the year you turned 18 and your TFSA contribution room accumulates every year after that year.\n\nInvestment income earned by, and changes in the value of your TFSA investments will not affect your TFSA contribution room for current or future years.\nThe annual TFSA dollar limit for each of the years from 2009 to 2024 are:",
          "title": "contributions-room"
        },
        {
          "id": "gov-tfsa-where-to",
          "title": "where-to",
          "snippet": "Where to find your TFSA contribution room information\nYour TFSA contribution room information can be found by using one of the following services:\n\nMy Account for Individuals.\nMyCRA at Mobile apps – Canada Revenue Agency.\nRepresent a Client if you have an authorized representative.\nTax Information Phone Service (TIPS) at 1-800-267-6999.\nIn addition, if you want to receive a TFSA Room Statement, call us. You can also ask for a TFSA Transaction Summary that shows the information that we received from your TFSA issuer(s) about your contributions and withdrawals.\n\nIf the information that we have about your TFSA transactions is not complete or if you have made contributions to your TFSA this year, use Form RC343, Worksheet – TFSA contribution room, to calculate your TFSA contribution room for the current year. If we have deemed your unused TFSA contribution room to be a specific amount, do not use this form; call us for more information.\n\nYou must keep records about your TFSA transactions to make sure that your contributions do not go over your TFSA contribution room. We will keep track of an individual's contribution room and determine the available TFSA contribution room for each eligible individual based on information provided annually by the TFSA issuers."
        },
        {
          "id": "gov-tfsa-auth-rep",
          "title": "auth-rep",
          "snippet": "How to authorize a representative\nYou can authorize a representative (such as your spouse or common-law partner, tax preparer, or accountant) to get information about your tax matters and give us information on your behalf. We will accept information from and/or provide information to your representative only after we are satisfied that you have authorized us to do so through My Account for Individuals or Representative authorization.\n\nYour authorization will stay in effect until any one of the following situations applies:\n\nit is cancelled by you or your representative\nit reaches the expiry date you choose\nwe receive notification of your death \nYou or your representative can cancel the consent you gave by telephone or in writing.\n\nIf you were the legal representative of a deceased person, see Guide T4011, Preparing Returns for Deceased Persons, to know what documents are required.\n\nLearn more about representatives by going to Representative authorization."
        },
        {
          "id": "gov-tfsa-find-mail",
          "title": "find-mail",
          "snippet": "How to find your online mail\nSome Tax-Free Savings Account letters are available for online mail. Once you are registered for online mail, the CRA will send you an email notification when you have new mail to view in your secure online account. Correspondence available through online mail will no longer be printed and mailed through Canada Post. To learn more, go to Email notifications for individuals.\n\nHow to know your TFSA contribution room\nThe TFSA contribution room is the total amount of all of the following:\n\nthe TFSA dollar limit of the current year\nany unused TFSA contribution room from previous years\nany withdrawals made from the TFSA in the previous year\nNote\nQualifying transfers, exempt contributions and specified distributions are not considered in the calculation of contribution room."
        },
        {
          "id": "gov-tfsa-example",
          "title": "example",
          "snippet": "Example\nFrom 2014 until the end of 2022, Josh contributed the maximum TFSA dollar limit each year. As a result, his unused TFSA contribution room at the end of 2022 was zero.\n\nHis TFSA contribution room at the beginning of 2023 was $6,500 (the 2023 TFSA dollar limit).\n\nOn June 15, 2023, Josh made a contribution of $1,000. On October 26, 2023, he withdrew $4,000.\n\nHis unused TFSA contribution room at the end of 2023 was $5,500 ($6,500 – $1,000).\n\nJosh calculated his TFSA contribution room for the beginning of 2024 as follows:\n\nTFSA contribution room at the beginning of 2024\nTFSA contribution room at the beginning of 2023\n     \t$\t  6,500\nMinus: Contributions made in 2023\n-\t$\t  1,000\nUnused TFSA contribution room at the end of 2023\n \t$\t  5,500\nPlus: Total withdrawals made in 2023\n+\t$\n  4,000\nPlus: 2024 TFSA dollar limit\n+\t$\t  7,000\nTFSA contribution room at the beginning of 2024\n \t$\t16,500\n\nThe TFSA contribution room will not accumulate for any year during which the individual is a non-resident of Canada throughout the entire year.\n\nThe TFSA dollar limit is not prorated in the year when an individual meets any one of the following conditions:\n\nturns 18 years of age\ndies\nbecomes a resident or a non-resident of Canada"
        },
        {
          "id": "gov-tfsa-recieve-info",
          "title": "recieve-info",
          "snippet": "How we receive your TFSA information\nBy the last day of February of the following year, all issuers are required to electronically send a TFSA record to us for each individual who has a TFSA.\n\nIf you disagree with any of the information on your TFSA Room Statement, or TFSA Transaction Summary, including dates or amounts of contributions or withdrawals which your TFSA issuer has provided to us, contact your TFSA issuer. If any information initially provided by the issuer about your account is incorrect, the issuer must send us a revised record so that we can update our records.\n\nYou can view your TFSA Transaction Summary online. Go to My Account for Individuals to see all the contributions and withdrawals made to your TFSA.\n\nTypes of permitted investments\nGenerally, the types of investments that are permitted in a TFSA are the same as those permitted in a registered retirement savings plan (RRSP). These would include the following types:\n\ncash\nmutual funds\nsecurities listed on a designated stock exchange\nguaranteed investment certificates\nbonds\ncertain shares of small business corporations"
        },
        {
          "id": "gov-tfsa-in-kind",
          "title": "in-kind",
          "snippet": "\"In kind\" contributions\nYou can also make \"in kind\" contributions (for example, securities you hold in a non-registered account) to your TFSA, as long as the property is a qualified investment.\n\nYou will be considered to have disposed of the property at its FMV at the time of the contribution. If the FMV is more than the cost of the property, you will have to report the capital gain on your income tax and benefit return. However, if the cost of the property is more than its FMV, you cannot claim the resulting capital loss. The amount of the contribution to your TFSA will be equal to the FMV of the property."
        },
        {
          "id": "gov-tfsa-transfers-withdrawals",
          "title": "transfers-withdrawals",
          "snippet": "Transfers from your RRSP\nIf you transfer an investment from your RRSP to your TFSA, you will be considered to have withdrawn the investment from the RRSP at its FMV. That amount will be reported as an RRSP withdrawal and must be included in your income in that year. You can claim the tax withheld on the withdrawal at line 43700 of your income tax and benefit return. If the transfer into your TFSA takes place immediately, the same value will be used as the amount of the contribution to the TFSA. If the contribution to the TFSA is deferred, the amount of the contribution will be the FMV of the investment at the time of that contribution.\n\nExcept in certain circumstances, you cannot exchange securities for cash, or other securities of equal value, between your accounts, either between two registered accounts or between a registered and a non-registered account (swap).\n\nWithdrawals from a TFSA\nA qualifying transfer from one TFSA to another is not considered to be a withdrawal.\n\nMaking withdrawals\nDepending on the type of investment held in your TFSA, you can generally withdraw any amount from the TFSA at any time. Withdrawing funds from your TFSA does not reduce the total amount of contributions you have already made for the year.\n\nWithdrawals, excluding qualifying transfers and specified distributions, made from your TFSA in the year will only be added back to your TFSA contribution room at the beginning of the following year."
        },
        {
          "id": "gov-tfsa-impact-on-benefits",
          "snippet": "Impact on your government benefits and credits\nYour federal income-tested benefits and credits such as Old Age Security (OAS) benefits, the Guaranteed Income Supplement (GIS), or Employment Insurance (EI) benefits will not be reduced as a result of the income you earn in your TFSA or the amount you withdraw from your TFSA.\n\nThe income earned in the account or amounts withdrawn from a TFSA will also not affect your eligibility for federal credits, including the Canada child benefit (CCB), the Canada workers benefit (CWB), the goods and services tax/harmonized sales tax (GST/HST) credit, or the age amount. You can withdraw money from the TFSA at any time, for any reason, with no tax consequences, and without affecting your eligibility for federal income-tested benefits and credits.\n\nYou can use My Account for Individuals or the MyBenefits CRA Mobile apps to securely access your benefit information.\n\n",
          "title": "impact-on-benefits"
        },
        {
          "id": "gov-rrsp-setting-up",
          "title": "setting-up",
          "snippet": "You set up a registered retirement savings plan through a financial institution such as a bank, credit union, trust or insurance company. Your financial institution will advise you on the types of RRSP and the investments they can contain.\n\nYou may want to set up a spousal or common-law partner RRSP. This type of plan can help ensure that retirement income is more evenly split between both of you. The benefit is greatest if a higher-income spouse or common-law partner contributes to an RRSP for a lower-income spouse or common-law partner. The contributor receives the short term benefit of the tax deduction for the contributions and the annuitant, who is likely to be in a lower tax bracket during retirement, receives the income and reports it on their income tax and benefits return\n\nYou may want to set up a self-directed RRSP if you prefer to build and manage your own investment portfolio by buying and selling a variety of different types of investments. For more information on eligible investments, see Self-directed RRSPs. If you are considering this type of RRSP, be sure to consult with your financial institution.\n\nYou make your RRSP contributions directly to the RRSP issuer. For more information, see Contributing to an RRSP, PRPP, or SPP."
        },
        {
          "id": "gov-rrsp-limit",
          "title": "limit",
          "snippet": "References to registered retirement savings plan (RRSP) contributions also include contributions to your pooled registered pension plan (PRPP) and to your and your spouse’s or common-law partner’s specified pension plan (SPP). You can find your RRSP deduction limit by going to:\n\nForm T1028, Your RRSP Information for YEAR:\nThe CRA may send you Form T1028 if there are any changes to your RRSP deduction limit since your last notice of assessment or reassessment, or if the RRSP deduction limit statement was not included on your notice. As well, you may be receiving a Form T1028 because you participated in the Home Buyer’s Plan (HBP) or the Lifelong Learning Plan (LLP).\nMy Account\nMyCRA mobile app\nTax information Phone Service (TIPS)\nThe RRSP Deduction Limit Statement, on your latest notice of assessment or notice of reassessment\nYou can also get your RRSP deduction limit by calling the CRA at 1-800-959-8281.\n\n"
        },
        {
          "id": "gov-rrsp-deduction-limit",
          "title": "deduction-limit",
          "snippet": "What is your RRSP deduction limit\nYour registered retirement savings plan (RRSP) deduction limit, is the maximum amount you can deduct from contributions made to your RRSPs, PRPP, SPP and to your spouse’s or common-law partner’s RRSP or SPP for a year.\n\nNote\nCertain types of qualifying income transferred to your RRSPs are excluded from the calculation of your RRSP deduction limit.\nHow is your RRSP deduction limit determined\nThe Canada Revenue Agency generally calculates your RRSP deduction limit as follows:\n\nyour unused RRSP deduction room at the end of the preceding year\nPlus\n\nThe lesser of the two following items:\n18% of your earned income in the previous year\nthe annual RRSP limit (for 2023, the annual limit is $30,780)\nThat exceeds one of the following items:\nyour pension adjustment (PA)\nyour prescribed amount for connected persons\nPlus\n\nyour pension adjustment reversal (PAR)\nMinus\n\nyour net past service pension adjustment (PSPA)\nIf you want to calculate your RRSP deduction limit yourself, see chart 3 of Guide T4040, RRSPs and Other Registered Plans for Retirement.\n\nWho can contribute to an RRSP, PRPP, or SPP\nGenerally, you can contribute to your RRSP, PRPP, or SPP:\n\nuntil December 31st of the year you turn 71 years of age\nwhen you have an available RRSP deduction limit\nYou can contribute to your spouse’s or common-law partner’s RRSP or SPP until December 31st of the year that they turn 71 years of age.\n\nWhat is the deadline to contribute to an RRSP, PRPP, or SPP for the purpose of claiming a deduction on your 2023 return\nContributions made to your RRSP, PRPP or SPP or your spouse's RRSP or SPP from March 2, 2023 to February 29, 2024 qualify.\n\nWhat if you contribute more than your RRSP deduction limit\nGenerally, you have to pay a tax of 1 percent per month on your contributions that exceed your RRSP deduction limit by more than $2,000.\n\nFor more information, go to Excess Contributions\n\nWhat RRSP, PRPP, or SPP contributions can you deduct on your income tax and benefit return\nYou can claim a deduction for:\n\ncontributions you made to your RRSP, PRPP or SPP\ncontributions you made to your spouse’s or common-law partner’s RRSP or SPP\nyour unused RRSP, PRPP or SPP contributions from a previous year\nYou cannot claim a deduction for:\n\namounts you pay for administration services for an RRSP\nbrokerage fees charged to buy and sell within a trusteed RRSP\nthe interest you paid on money you borrowed to contribute to an RRSP, PRPP, or SPP\nany capital losses within your RRSP\nemployer contributions to your PRPP\nWhat is not considered an RRSP, PRPP, or SPP contribution\nThe following are not considered to be an RRSP, PRPP, or SPP contribution for the purpose of claiming a deduction on your tax return. Find out the special rules that apply if you:\n\ntransfer amounts to your RRSP, PRPP, and SPP\nrepay funds that you withdrew under the Home Buyers’ Plan\nrepay funds that you withdrew under the Lifelong Learning Plan\nAmounts you transfer directly to your RRSP, PRPP, and SPP do not affect your RRSP deduction limit. However, you may need to include an amount in income and claim an offsetting deduction. See transferring certain types of payments for information about the special rules that apply.\n\nCan contributions be made to a deceased individual’s RRSP, PRPP, or SPP\nNo one can contribute to a deceased individual’s RRSP, PRPP or SPP after the date of death.\n\nBut, the deceased individual’s legal representative can make contributions to the surviving spouse’s or common-law partner’s RRSP and SPP. The contribution must be made within the year of death or during the first 60 days after the end of that year.\n\nContributions made to a spouse’s or common-law partner’s RRSP or SPP can be claimed on the deceased individual’s tax return, up to that individual’s RRSP deduction limit, for the year of death."
        },
        {
          "id": "gov-rrsp-contributions",
          "title": "contributions",
          "snippet": "What are unused RRSP, PRPP or SPP contributions\nThese are amounts you contributed to your own RRSP, PRPP, or SPP or to an RRSP or SPP for your spouse or common-law partner after 1990 but did not deduct on line 20800 (line 208 for 2018 and prior tax years), of any previous income tax and benefit return, or designate as an HBP or LLP repayment.\n\nWhat to do with contributions you do not deduct\nIf you are not deducting all the RRSP, PRPP or SPP contributions you made in 2023 and the beginning of 2024, fill out Schedule 7, RRSP, PRPP and SPP Contributions and Transfers and HBP and LLP Activities. This includes contributions made to your:\n\nregistered retirement savings plan (RRSP)\npooled registered pension plan (PRPP)\nspecified pension plan (SPP)\nspouse’s or common-law partner’s RRSP or SPP\nFill out Schedule 7 for contributions made from March 2, 2023 to February 29, 2024. If you are filing a paper return, attach a filled out Schedule 7 to your 2023 income tax and benefit return. If you are filing electronically, keep the Schedule 7 in case the CRA asks to see it later.\n\nIf you have already filed your income tax and benefit return, fill out Schedule 7 and a Form T1-ADJ, T1 Adjustment Request and send it to your tax centre. You should also include a copy of your contribution receipts showing your name and social insurance number.\n\nIf you did not deduct all of the contributions you made to your RRSP, PRPP, or SPP or your spouse's or common-law partner's RRSP, or SPP, you have two options:\n\nyou can leave the unused contributions in the plan\nyou can withdraw the unused contributions\nIn either case, if you contribute over your RRSP deduction limit, you may have to pay tax on the unused contributions that exceed your RRSP deduction limit. If you withdrew the contribution under the Home Buyers’ Plan (HBP) or Lifelong Learning Plan (LLP), you may still be required to pay tax on the unused contributions that exceed your RRSP deduction limit.\n\nIf you withdraw the unused contributions, you have to include them as income on your income tax and benefit return. However, you may be able to deduct an amount equal to the withdrawn contributions. For more information, go to withdrawing the unused contributions.\n\nWhere to find your unused RRSP, PRPP or SPP contributions amount\nYour unused RRSP, PRPP or SPP contributions from previous years are identified on the line called “Unused RRSP contributions previously reported and available to deduct for YEAR” on:\n\nThe RRSP Deduction Limit Statement, on your latest notice of assessment or notice of reassessment\nForm T1028, Your RRSP Information for YEAR"
        },
        {
          "id": "gov-rrsp-excess-contributions",
          "title": "excess-contributions",
          "snippet": "Excess Contributions\nIf you (or your employer for pooled registered pension plan (PRPP) purposes) contribute more to your RRSP, PRPP or SPP, or your spouse's or common-law partner's RRSP or SPP than your RRSP deduction limit allows, you will have an excess contribution.\n\nGenerally, you have RRSP excess contributions if your unused RRSP, PRPP, and SPP contributions from prior years and your current calendar year contributions are more than your RRSP deduction limit shown on your latest notice of assessment, notice of reassessment, or Form T1028, Your RRSP Information for 2024, plus $2,000.\n\nAlso, you can only qualify for the additional $2,000 amount if you were 18 or older at any time in 2023.\n\nGenerally, you have to pay a tax of 1% per month on your unused contributions that exceed your RRSP deduction limit by more than $2,000. Your notice of assessment or notice of reassessment will indicate that you may have to pay a 1% tax on RRSP excess contributions if your unused RRSP, PRPP, or SPP contributions exceed your RRSP deduction limit. You can view your RRSP information online by going to My Account for Individuals.\n\nNote\nYou may not have to pay the 1% tax on all of your excess contributions, if one of the following situations applies:\n\nyou withdrew the excess amounts before the end of the month when the excess contribution was made\nyour contributions were qualifying group plan amounts\nthe contributions were made before February 27, 1995\nIf you withdrew the excess amounts under the Home Buyers’ Plan (HBP) or Lifelong Learning Plan (LLP), you may still be required to pay the 1% tax on all of your excess contributions.\n\nIf you have to pay this 1% tax, send your completed T1-OVP, 2024 Individual Tax Return for RRSP, PRPP and SPP Excess Contributions to your tax center and pay the tax no later than 90 days after the end of the year in which you had the excess contributions.\n\nWhich return you have to use\nIf you have RRSP excess contributions made from January 1, 1991, to December 31, 2024, that are subject to tax, fill out a T1-OVP-S, 2024 Simplified Individual Tax Return for RRSP, PRPP and SPP Excess Contributions, for each applicable tax year.\n\nNotes\nWhen you file your return, send documents that identify the exact months of all RRSP, PRPP, and SPP contributions and RRSP, PRPP, SPP or RRIF withdrawals you made in 2024. Please note RRSP receipts, T4RSP and T4RIF slips do not contain this information.\n\nIf the supporting documents received do not show the exact months of the contributions or withdrawals, the CRA may assess the T1-OVP return based on their records. This means that the CRA would include contributions from the first 60 days of the year in January and include the contributions from the rest of the year in March. As well, the CRA would include the withdrawal(s) in December.\n\nIf you made mandatory contributions to a group RRSP or a PRPP plan in 2023 or 2024 that are subject to tax, you must fill out a T1-OVP, 2024 Individual Tax Return for RRSP, PRPP and SPP Excess Contributions, for each applicable tax year.\n\nNotes\nWhen you file your return, include a copy of the contract or collective agreement from your employer or union stating that group contributions are mandatory and a statement confirming the amounts and dates of mandatory contributions and withdrawals for the year.\n\nAlso include documents showing the exact months of all RRSP, PRPP and SPP contributions and RRSP, PRPP, SPP, or RRIF withdrawals you made in 2024. Please note RRSP receipts, T4RSP and T4RIF slips do not contain this information.\n\nIf the supporting documents received do not show the exact months of the contributions or withdrawals, the CRA may assess the T1-OVP return based on their records. This means that the CRA would include contributions from the first 60 days of the year in January and include the contributions from the rest of the year in March. As well, the CRA would include the withdrawal(s) in December.\n\nIf you would like the CRA to complete the return(s) for you, send us written authorization and the supporting documents mentioned above for the year(s) in question.\n\nWaiver or cancellation of the RRSP excess contribution tax\nIf you determined that you must pay a tax on your RRSP excess contributions, you may ask in writing that we waive or cancel the tax if both of the following conditions are met:\n\nyour excess contributions on which the tax is based arose due to a reasonable error\nyou are taking, or have taken, reasonable steps to eliminate the excess contributions\nNote\nA waiver refers to penalties and interest otherwise payable by a taxpayer for which relief is granted by the CRA before this amount is assessed or charged to the taxpayer. A cancellation refers to the amount of tax that was assessed or charged to the taxpayer for which relief is granted by the CRA.\n\nTo consider your request, we will need you to fill out Form RC2503, Request for Waiver or Cancellation of Part X.1 Tax – RRSP, PRPP and SPP Excess Contribution Tax. Your form should explain:\n\nwhy you made excess contributions and why this is a reasonable error\nwhat steps you are taking, or have taken, to eliminate the excess contributions\nSend your completed request and supporting documents that identify the exact months of all your RRSP, PRPP, and SPP contributions and RRSP, PRPP, SPP or RRIF withdrawals for the years involved, as well as any documents that would support the explanation of the reasonable error that caused the excess contribution to the tax center as shown on your notice of assessment or reassessment. Please note that we do not accept the official RRSP receipts or the T4RSP or T4RIF slips for this purpose as they do not contain the exact months of all your contributions or withdrawals.\n\nNote\nIf the CRA does not waive or cancel the tax, and the supporting documents received do not show the exact months of the contributions or withdrawals, the CRA may (re)assess the T1-OVP return(s) based on their records. This means that the CRA would include contributions from the first 60 days of the year in January and include the contributions from the rest of the year in March. As well, the CRA would include the withdrawal(s) in December.\n\nFor more information on cancellation or waiver of late-filing penalties and interest, see Information Circular IC07-1R1, Taxpayer Relief Provisions.\n\nHow does a voluntary disclosure work\nIf you realize the information you gave to the CRA is wrong or incomplete, you may be able to make a voluntary disclosure. To see if your disclosure qualifies for this program, go to Voluntary Disclosures Program (VDP).\n\nNote\nThis program does not apply to any tax return for which we have started a review.\n\nFor more information and to know if your disclosure qualifies for this program, refer to Information Circular IC00-1R6, Voluntary Disclosures Program.\n\nBe sure to indicate clearly, on any disclosure you make, that you are submitting information under the Voluntary Disclosures Program.\n\nLate filing penalties\nThe CRA will charge a late filing penalty if you do not file your T1-OVP, 2024 Individual Tax Return for RRSP, PRPP and SPP Excess Contributions return on time. The due date for filing the T1-OVP is 90 days after the end of the calendar year.\n\nThe penalty is:\n\n5% of your balance owing\nplus\n1% of your balance owing for each month that your T1-OVP return is late, to a maximum of 12 months\nYour late filing penalty may be higher if CRA charged you a late-filing penalty on your T1-OVP return for any of the three previous years.\n\nInterest charges\nInterest is compounded daily on:\n\nunpaid tax calculated on your T1-OVP, 2024 Individual Tax Return for RRSP, PRPP and SPP Excess Contributions\nunpaid late filing penalty\nCRA calculates interest starting on the 91st day of the following year.\n\nFor more information on relief of late filing penalties and interest, see Information Circular IC07-1, Taxpayer Relief Provisions.\n\n"
        },
        {
          "id": "gov-rrsp-claim-deductions",
          "title": "claim-deductions",
          "snippet": "How to claim your RRSP, PRPP or SPP contributions on your income tax and benefit return\nRegistered retirement savings plan (RRSP) issuers, pooled registered pension plan (PRPP) or specified pension plan (SPP) administrators will give you a receipt for the amounts you contributed. If you contributed to your spouse's or common-law partner's RRSP or SPP, the receipt should show your name as the contributor and your spouse's name or common-law partner's name as the annuitant.\n\nIf you are filing a paper return, attach the receipt(s) to your income tax and benefit return. \n\nIf using EFILE, show your receipt(s) to your tax preparer and keep them in case the Canada Revenue Agency (CRA) asks to see them. \n\nIf you are using NETFILE, keep your receipt(s) in case the CRA asks to see them.\n\nIf you do not get your receipt(s) before the filing deadline, go to Missing slips or receipts.\n\nIf you made contributions from January 1, 1991, to March 1, 1995, that you did not deduct, and you did not show it on Schedule 7 for tax year 1994, Contact the Canada Revenue Agency.\n\nWhere do you deduct your contributions\nDeduct your contributions on line 20800 – RRSP deduction of your income tax and benefit return.\n\nFor information on deducting your pooled registered pension plan (PRPP) contributions, go to contributions to a PRPP.\n\n"
        }
      ]
    });
    
    // Save the response
    setInvestingAdvice(response.text);
  };

  // Define generateGoal as a function
  const generateGoal = async () => {
    const cohere = new CohereClient({
      token: secrets.COHERE_API_KEY,
    });
  
    const response = await cohere.chat({
      message: GOAL_PROMPT,
      model: "command-r-plus",
      preamble: PREAMBLE,
    });
    
    // Save the response
    setGoal(response.text);
  };

  // Define generateDemon as a function
  const generateDemon = async () => {
    const cohere = new CohereClient({
      token: secrets.COHERE_API_KEY,
    });
  
    const response = await cohere.chat({
      message: DEMON_PROMPT,
      model: "command-r-plus",
      preamble: PREAMBLE,
    });
    
    // Save the response
    setDemon(response.text);
  };

  const apiKey = secrets.COHERE_API_KEY;

  return (
    <>
      <div className="color-red">
        Test
      </div>
      <div>
       
        <h3>Your API Key: {apiKey}</h3> {/* Display the API Key */}
        <button className="square border-4" onClick={generateDemon}>Find my demons</button>
        <p>{demon}</p>
        <br></br>
        <button className="square border-4" onClick={generateGoal}>Generate goal!</button>
        <p>{goal}</p>
        <br></br>
        <button className="square border-4" onClick={generateAdvice}>Investing advice</button> 
        <p>{investingAdvice}</p>

      </div>
      </>
  );
}

export default App;
