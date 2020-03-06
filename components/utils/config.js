export const modelCollection = [
	'10.90 L 3X2 SCL BUS',
	'10.90 L STARLINE DD',
	'20.15 M LP F/L CWC',
	'20.15 M LPO F/L',
	'20.15 N LPO F/L',
	'20.15 H LP CWC',
	'20.15 M LPO 6S',
	'10.75 E CWC AB',
	'10.75 E F/L CWC AB',
	'10.75 F CWC BS3 AB PS',
	'10.75 H F/L CWC AB',
	'10.75 H CWC',
	'10.75 F F/L CWC',
	'10.75 F CWC',
	'10.75 H BUS PS AB BS3 SCL SKL (2X2) 32 Seat',
	'10.75 H SRL B 3X2 SCL (40 Seat)',
	'10.75 H SRL B 2X2 SCL BUS',
	'10.75 E BUS AB PS SRL RP',
	'10.75 H SRL B RP AB PS',
	'10.75 E SRL B AB PS 3X2 SCL',
	'Skyline PRO 3008 H BUS STF',
	'SKL PRO 3008H RP MD',
	'20.16 M DW CONT',
	'20.16 R CWC',
	'20.16 H CWC PS',
	'20.16 K HSD',
	'20.16 M ST CONT',
	'20.16 H CBC',
	'20.16 M CWC',
	'30.25XP L HSD',
	'30.25 XP L CBC',
	'30.25FE L CBC',
	'35.31 K HSD',
	'35.31 K CWC',
	'PRO 6031 P CBC',
	'TERRA 16 E CBC',
	'TERRA 16 HDR FBT',
	'TERRA25 G1 CBC BOG BS3 6.83 9S',
	'TERRA25 G BOGI 9S 6.8',
	'TERRA25 G FBT 12',
	'PRO 6037 CBC 28FT',
	'TERRA 16 XP E FBT',
	'10.80 C HSD RHD',
	'PRO 3015 J SLP HSD',
	'PRO 3015 J CBC',
	'PRO 1095 XP E DSD',
	'PRO 1095 XP E CBC AB PS',
	'PRO 1095 XP E HSD',
	'PRO 1095T E CBC PTO',
	'PRO 1080 E HSD',
	'PRO 1080 F CBC',
	'PRO 1080 XP C DSD',
	'PRO 1080 XP C CBC',
	'PRO 1080 XP C FBT',
	'PRO 1055T CBC PTO',
	'PRO 1055 C DSD',
	'PRO 1059 C HSD PS',
	'PRO 1059 XP E HSD',
	'PRO 1112 XP G CBC 17FT',
	'PRO 1112 XP H CBC',
	'PRO 1112 XP H HSD-20FT',
	'PRO 1112 XP H HSD PS-19FT',
	'PRO 1112 XP G HSD PS',
	'PRO 1112 XP L CBC 22FT',
	'PRO 1110 XP H 20FT',
	'PRO 1112XPT E UBT',
	'PRO 1049 C FSD',
	'PRO 1114 XP H HSD RHD',
	'20.15 NLPO F/L 1K 10R20 WS6S ABS BS3 EXP Front and Rear Suspension Weveller',
	'20.15 H LP CWC 5S 9R20-16PR BS3 EXP',
	'20.15 M LPO 6S 10R20 WAS BS3 ABS EXP NPL (Both Air Suspension)',
];

export const parameter = [
	{
		name: 'Invoice value in INR',
		type: 'icon',
		icon: 'rupee',
		iconType: 'FontAwesome',
		id: 'inr',
		row: true,
		default: ' ',
	},
	{
		name: 'Exchange Rate',
		type: 'value',
		id: 'exRate',
		default: 1.6015,
	},
	{
		name: 'Custom Duty',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'customDuty',
		default: '28.5',
	},
	{
		name: 'Excise Duty',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'exciseDuty',
		default: '5',
	},
	{
		name: 'Custom Clearing & Forwarding Charge',
		type: 'value',
		id: 'customCFC',
		row: true,
		default: ' ',
	},
	{
		name: 'VAT',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'vat',
		default: '13',
	},
	{
		name: 'Road Tax',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'roadTax',
		default: '7',
	},
	{
		name: 'Registration & Annual Tax',
		type: 'value',
		id: 'register',
		default: ' ',
	},
	{
		name: 'Insurance',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'insurance',
		row: true,
		default: '3',
	},
	{
		name: 'PDI, Driver & Fuel',
		type: 'value',
		id: 'pdi',
		default: ' ',
	},
	{
		name: 'Transit Insurance (1 Week)',
		type: 'value',
		id: 'transit',
		default: ' ',
	},
	{
		name: 'Free Servicing Coupon ',
		type: 'value',
		id: 'service',
		default: ' ',
	},
	{
		name: 'LC/Swift & Other ',
		type: 'value',
		id: 'lc',
		row: true,
		default: ' ',
	},
	{
		name: 'Provision for Good Will Warrenty',
		type: 'value',
		id: 'warrenty',
		default: ' ',
	},
	{
		name: 'Indian Custom Clearence',
		type: 'value',
		id: 'IndcustomC',
		default: ' ',
	},
	{
		name: 'Stock Transfer & Local Logistic',
		type: 'value',
		id: 'stockTrans',
		default: ' ',
	},
	{
		name: 'Stock Yard cost',
		type: 'value',
		id: 'stockYard',
		row: true,
		default: ' ',
	},
	{
		name: 'Financing Commission',
		type: 'value',
		id: 'financeCom',
		default: ' ',
	},
	{
		name: 'Interest on Investment',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'interestInvest',
		default: '15',
	},
	{
		name: 'Credit Period',
		type: 'value',
		id: 'credit',
		default: '3',
	},
	{
		name: 'Admin and Sales Overhead',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'adminSales',
		row: true,
		default: '4',
	},
	{
		name: 'Adv, Promotion,Travelling,Demo&Field',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'advProm',
		default: '2',
	},
	{
		name: 'Staff Incentives',
		type: 'value',
		id: 'staff',
		default: ' ',
	},
	{
		name: "Dealer's Margin",
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'dealer',
		default: '2',
	},
	{
		name: "Distributor's Margin",
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'distributor',
		row: true,
		default: '2.5',
	},
	{
		name: 'VAT',
		type: 'icon',
		icon: 'percent',
		iconType: 'Feather',
		id: 'vat2',
		default: '13',
	},
	// { name: '', type: '', id: '', default: '', row: true },
];

export const parameterDetail = [
	{ name: 'Invoice value in INR', id: 'inr' },
	{ name: 'Value in NPR', id: 'exRate' },
	{ name: 'Total upto Boarder', id: 'boarder' },
	{ name: 'Custom Duty', id: 'customDuty' },
	{ name: 'Custom Clearing & Forwarding Charge', id: 'customCFC' },
	{ name: 'Excise Duty', id: 'exciseDuty' },
	{ name: 'VAT', id: 'vat' },
	{ name: 'Boarder-In Price', id: 'boarderInPrice' },
	{ name: 'Road Tax (7%)', id: 'roadTax' },
	{ name: 'Insurance', id: 'insurance' },
	{ name: 'Registration & Annual Tax', id: 'register' },
	{ name: 'PDI, Driver & Fuel', id: 'pdi' },
	{ name: 'Transit Insurance (1 Week)', id: 'transit' },
	{ name: 'LC/Swift & Other ', id: 'lc' },
	{ name: 'Free Servicing Coupon ', id: 'service' },
	{ name: 'Provision for Good Will Warrenty', id: 'warrenty' },
	{ name: 'Indian Custom Clearence', id: 'IndcustomC' },
	{ name: 'Stock Yard cost', id: 'stockYard' },
	{ name: 'Stock Transfer & Local Logistic', id: 'stockTrans' },
	{ name: 'Financing Commission', id: 'financeCom' },
	{ name: 'Interest on Investment', id: 'interestInvest' },
	{ name: 'Cost till Dealers Location', id: 'costTillDealer' },
	{ name: 'Admin and Sales Overhead', id: 'adminSales' },
	{
		name: 'Adv, Promotion, Travelling, Demo & Field Activities',
		id: 'advProm',
	},
	{ name: 'Staff Incentives', id: 'staff' },
	{ name: 'Total Landing Cost', id: 'totalLandingCost' },
	{ name: "Distributor's Margin", id: 'distributor' },
	{ name: "Dealer's Margin", id: 'dealer' },
	{ name: 'Price Before VAT (less VAT paid)', id: 'priceBeforeVat' },
	{ name: 'VAT', id: 'vat2' },
	{ name: 'Suitable MRP', id: 'suitableMRP' },
	{ name: 'With Overhead', id: 'overhead' },
	{ name: 'Without Overhead (NET)', id: 'withoutOverhead' },
	{ name: 'Interest Months', id: 'interestMonth' },
	// { name: 'Discussed MRP', id: 'discussedMRP' },
	// // { name: 'IMPACT (Positive/Negative)', id: 'impact' },
	// { name: 'TIER 1 (GP)', id: 'tier1' },
	// { name: 'TIER 2 (NP)', id: 'tier2' },
];
export const tablePatameter = [
	{ name: 'Invoice value in INR', id: 'inr' },
	{ name: 'Value in NPR', id: 'npr' },
	// { name: 'Boarder-In Price', id: 'boarder' },
	// { name: 'Free Servicing Coupon ', id: 'service' },
	// { name: 'Provision for Good Will Warrenty', id: 'warrenty' },
	// { name: 'Indian Custom Clearence', id: 'IndcustomC' },
	// { name: 'Stock Yard cost', id: 'stockYard' },
	// { name: 'Stock Transfer & Local Logistic', id: 'stockTrans' },
	{ name: 'Interest on Investment', id: 'interestInvest' },
	{ name: 'Price Before VAT (less VAT paid)', id: 'vat2V' },
	{ name: 'Suitable MRP', id: 'suitableMRP' },
	// { name: 'With Overhead', id: 'overhead' },
	// { name: 'Without Overhead (NET)', id: 'withoutOverhead' },
	// { name: 'Interest Months', id: 'interestMonth' },
	{ name: 'TIER 1 (GP)', id: 'tier1' },
	{ name: 'TIER 2 (NP)', id: 'tier2' },
];
