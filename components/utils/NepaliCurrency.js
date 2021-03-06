export const NepaliCurrency = value => {
	console.log('bef', value);
	const [nepaliNumber, floatingPoint] = String(value).split('.');
	const commaConverted = InternalNepaliCurrencyCalculation(nepaliNumber);
	let returnValue = String(value).indexOf('.') != '-1' ? commaConverted + '.' + (floatingPoint || '') : commaConverted;
	console.log('aft', returnValue);
	return returnValue;
};

export const InternalNepaliCurrencyCalculation = value => {
	const numb = Number(value);
	if (numb) {
		let num = numb.toFixed(2).toString();
		let sign = num.substr(0, 1);
		if (sign === '-') {
			num = num.substr(1, num.length - 1);
		} else {
			sign = '';
		}
		const decimal = num.split('.');
		const result = [];
		let data = '';
		value = decimal[0];
		for (let i = 0; i < value.length; i++) {
			if (i === 3) {
				result.push(data);
				data = '';
			}
			if (i > 3 && (i - 1) % 2 === 0) {
				result.push(data);
				data = '';
			}
			data += value[value.length - 1 - i].toString();
		}
		result.push(data);
		let res = result
			.join(',')
			.split('')
			.reverse()
			.join('');
		if (Number(decimal[1]) && decimal[1]) {
			res += '.' + decimal[1];
		}
		let val = sign + res;
		return val;
	} else {
		return '';
	}
};

export const removeCommas = val => {
	var num = val;
	num = num.replace(/,/g, '');
	return num;
};
