import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TouchableOpacity, Dimensions, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Input, Spinner, Icon, Toast, Label } from 'native-base';
import { Platform, AsyncStorage } from 'react-native';
import { parameterDetail } from '../components/utils/config';
import { get } from '../components/services/api';
import { CleaveCurrency, NepaliCurrency } from '../components/utils/NepaliCurrency';
import { bURL } from '../components/app-config';
import { getModel } from '../components/services/addModelService';
import MyModel from '../components/utils/MyModel';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { calcMain } from '../components/utils/calculation';

class General extends Component {
	static navigationOptions = () => ({
		headerShown: false,
	});
	state = {
		modalVisible: false,
		detailModal: false,
		busName: '',
		modelData: null,
		searchModelData: null,
		errors: {},
		discussedMRP: 0,
		suitableMRP: 0,
		Impact: 0,
		discount: 0,
		tier1val: 0,
		tier2val: 0,
		credit: 0,
		inr: 0,
		overhead: 0,
		originalValues: {},
		generalData: null,
		loading: true,
		role: '',
		selectedVal: '',
		Burl: `${bURL}api/vehiclemodel`,
	};

	async componentDidMount() {
		try {
			const { data: modelData } = await getModel();
			const value = await AsyncStorage.getItem('user');
			if (value != null) {
				this.setState({ role: JSON.parse(value).role, modelData: modelData.data, searchModelData: modelData.data, loading: false });
			}
		} catch (err) {
			this.setState({ errors: err });
			Toast.show({
				text: 'Error',
				position: 'bottom',
				duration: 3000,
				type: 'danger',
			});
		}
	}

	onModalClick = () => {
		this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
	};

	onDetailModal = () => {
		this.setState(prevState => ({ detailModal: !prevState.detailModal }));
	};

	handleSearch = val => {
		const { modelData } = this.state;
		let newVal = val.toLowerCase();
		if (val) {
			data = modelData.filter(data => {
				return data.model.toLowerCase().indexOf(newVal) != -1;
			});
			this.setState({ searchModelData: data });
		} else {
			this.setState({ searchModelData: modelData });
		}
	};

	onSelected = async val => {
		const { Burl } = this.state;
		let Url = `${Burl}/${val}`;
		this.setState({ loading: true });
		this.setState({ modalVisible: false });
		const { data: generalData } = await get(Url);

		let tier1val = generalData && generalData['overhead'];
		let tier2val = generalData && generalData['withoutOverhead'];
		let suitableMRP = generalData && generalData['suitableMRP'];
		let discussedMRP = generalData && generalData['suitableMRP'];
		let credit = generalData && generalData['credit'];
		let inr = generalData && generalData['inr'];
		let interestInvestV = generalData && generalData['interestInvestV'];
		let priceBeforeVat = generalData && generalData['priceBeforeVat'];
		let valOver = generalData && Number(generalData['adminSalesV']) + Number(generalData['advPromV']);
		let overhead = valOver.toFixed(2);
		this.setState({
			generalData,
			busName: val,
			modalVisible: false,
			loading: false,
			suitableMRP,
			discussedMRP,
			tier1val,
			tier2val,
			credit,
			inr,
			overhead,
			interestInvestV,
			priceBeforeVat,
			originalValues: {
				tier1val,
				tier2val,
				suitableMRP,
				discussedMRP,
				credit,
				inr,
				overhead,
				interestInvestV,
				priceBeforeVat,
			},
		});
	};

	handleDiscount = val => {
		const { suitableMRP, discussedMRP, tier1val, tier2val } = this.state.originalValues;

		let newFinal;
		let Impact;
		let tier1;
		let tier2;

		if (val) {
			newFinal = Number(suitableMRP) - Number(val);
			Impact = Number(newFinal) - Number(suitableMRP);
			tier1 = Number(tier1val) + Number(Impact);
			tier2 = Number(tier2val) + Number(Impact);
		} else {
			newFinal = Number(discussedMRP);
			Impact = 0;
			tier1 = Number(tier1val);
			tier2 = Number(tier2val);
		}
		this.setState({
			discussedMRP: newFinal.toFixed(2).toString(),
			discount: val.toString(),
			Impact: Impact.toFixed(2),
			tier1val: tier1.toFixed(2),
			tier2val: tier2.toFixed(2),
		});
	};

	handleDiscussed = val => {
		const { suitableMRP, discussedMRP, tier1val, tier2val } = this.state.originalValues;

		let newFinal;
		let Impact;
		let tier1;
		let tier2;
		let discussed;

		if (val) {
			newFinal = Number(suitableMRP) - val;
			Impact = Number(val) - Number(suitableMRP);
			tier1 = Number(tier1val) + Number(Impact);
			tier2 = Number(tier2val) + Number(Impact);
			discussed = val;
		} else {
			newFinal = 0;
			Impact = 0;
			tier1 = Number(tier1val);
			tier2 = Number(tier2val);
			discussed = Number(discussedMRP);
		}
		this.setState({
			discussedMRP: val.toString(),
			discount: newFinal.toFixed(2).toString(),
			Impact: Impact.toFixed(2),
			tier1val: tier1.toFixed(2),
			tier2val: tier2.toFixed(2),
		});
	};

	handleINR = (name, val) => {
		const { generalData } = this.state;
		let newData;
		if (val) {
			newData = calcMain(generalData, name, val);
		} else {
			newData = calcMain(generalData, name, 0);
		}
		console.log(newData, val);

		let valOver = generalData && Number(newData['adminSalesV']) + Number(newData['advPromV']);
		let overhead = valOver.toFixed(2);

		this.setState({
			inr: val,
			tier1val: newData.tier1.toFixed(2),
			tier2val: newData.tier2.toFixed(2),
			interestInvestV: newData.interestInvestV.toFixed(2),
			priceBeforeVat: newData.priceBeforeVat.toFixed(2),
			suitableMRP: newData.suitableMRP.toFixed(2),
			discussedMRP: newData.suitableMRP.toFixed(2),
			overhead,
		});
	};

	handleCredit = (name, val) => {
		const { generalData } = this.state;
		let newData;
		if (val) {
			newData = calcMain(generalData, name, val);
		} else {
			newData = calcMain(generalData, name, 0);
		}
		console.log(newData, val);

		let valOver = generalData && Number(newData['adminSalesV']) + Number(newData['advPromV']);
		let overhead = valOver.toFixed(2);

		this.setState({
			credit: val,
			tier1val: newData.tier1.toFixed(2),
			tier2val: newData.tier2.toFixed(2),
			interestInvestV: newData.interestInvestV.toFixed(2),
			priceBeforeVat: newData.priceBeforeVat.toFixed(2),
			suitableMRP: newData.suitableMRP.toFixed(2),
			discussedMRP: newData.suitableMRP.toFixed(2),
			overhead,
		});
	};

	render() {
		const { generalData, discussedMRP, suitableMRP, discount, credit, inr, overhead, interestInvestV, priceBeforeVat, tier1val, tier2val, role, searchModelData, loading } = this.state;

		return (
			<View style={{ flex: 1 }}>
				{loading ? (
					<View style={styles.mainscreen}>
						<ActivityIndicator size={40} color={'#0c4ca3'} />
					</View>
				) : (
					<>
						{generalData ? (
							<KeyboardAvoidingView behavior="position">
								<ScrollView>
									<View style={{ flex: 1, paddingTop: 10 }}>
										<View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row' }}>
											<AntDesign
												name="arrowleft"
												size={25}
												color={'#000'}
												style={{ width: '15%', justifyContent: 'flex-start', marginTop: 20, paddingRight: 10 }}
												onPress={() => this.props.navigation.goBack()}
											/>
											<Text style={{ textAlign: 'center', width: '75%', justifyContent: 'center', fontWeight: 'bold', color: '#1D4CBC', fontSize: 15, marginTop: 20 }}>
												{this.state.busName || 'Model Name'}
											</Text>
											{role === 'admin' && (
												<View style={{ height: 30, width: 30, borderRadius: 1, marginTop: 18 }}>
													<MaterialCommunityIcons name="file-document-box-multiple" color="green" onPress={this.onDetailModal} size={30} />
												</View>
											)}
										</View>
										<View style={styles.table2}>
											{role === 'admin' ? (
												<View style={styles.tbody}>
													<View style={styles.tr}>
														<Text
															style={{
																...styles.td2,
																fontWeight: 'bold',
															}}
														>
															CIF Price :
														</Text>
														<View
															style={{
																...styles.td2,
																paddingBottom: 0,
																borderBottomWidth: 2,
																borderBottomColor: '#000',
																paddingTop: 4,
															}}
														>
															<TextInput
																name={'final'}
																style={styles.input}
																value={inr || ''}
																keyboardType="numeric"
																onChangeText={text => {
																	this.handleINR('inr', text);
																}}
															/>
														</View>
													</View>
													<View style={styles.tr}>
														<Text
															style={{
																...styles.td2,
																fontWeight: 'bold',
															}}
														>
															Credit Period :
														</Text>
														<View
															style={{
																...styles.td2,
																paddingBottom: 0,
																paddingTop: 4,
																borderBottomWidth: 2,
																borderBottomColor: '#000',
															}}
														>
															<TextInput
																name={'credit'}
																style={styles.input}
																// value={NepaliCurrency(discount) || 0}
																value={credit || ''}
																keyboardType="numeric"
																onChangeText={text => {
																	this.handleCredit('credit', text);
																}}
															/>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Interest on Investment :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{interestInvestV}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Price Before VAT :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{priceBeforeVat}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Suitable MRP :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{suitableMRP}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<Text
															style={{
																...styles.td2,
																fontWeight: 'bold',
															}}
														>
															Proposed MRP :
														</Text>
														<View
															style={{
																...styles.td2,
																paddingBottom: 0,
																borderBottomWidth: 2,
																borderBottomColor: '#000',
																paddingTop: 4,
															}}
														>
															<TextInput
																name={'final'}
																style={styles.input}
																value={discussedMRP || ''}
																keyboardType="numeric"
																onChangeText={text => {
																	this.handleDiscussed(text);
																}}
															/>
														</View>
													</View>
													<View style={styles.tr}>
														<Text
															style={{
																...styles.td2,
																fontWeight: 'bold',
															}}
														>
															Proposed Discount :
														</Text>
														<View
															style={{
																...styles.td2,
																paddingBottom: 0,
																paddingTop: 4,
																borderBottomWidth: 2,
																borderBottomColor: '#000',
															}}
														>
															<TextInput
																name={'discount'}
																style={styles.input}
																value={discount || ''}
																keyboardType="numeric"
																onChangeText={text => {
																	this.handleDiscount(text);
																}}
															/>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Gross Profit :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{tier1val}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Overhead Charged :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{overhead}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Management GP :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{tier1val}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Net Profit :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{tier2val}</Text>
														</View>
													</View>
												</View>
											) : (
												<View style={styles.tbody}>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>CIF Price :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{inr}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<Text
															style={{
																...styles.td2,
																fontWeight: 'bold',
															}}
														>
															Credit Period :
														</Text>
														<View
															style={{
																...styles.td2,
																paddingBottom: 0,
																paddingTop: 4,
																borderBottomWidth: 2,
																borderBottomColor: '#000',
															}}
														>
															<TextInput
																name={'credit'}
																style={styles.input}
																// value={NepaliCurrency(discount) || 0}
																value={credit || ''}
																keyboardType="numeric"
																onChangeText={text => {
																	this.handleCredit('credit', text);
																}}
															/>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Interest on Investment :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{interestInvestV}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Price Before VAT :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{priceBeforeVat}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Suitable MRP :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{suitableMRP}</Text>
														</View>
													</View>
													<View style={styles.tr}>
														<Text
															style={{
																...styles.td2,
																fontWeight: 'bold',
															}}
														>
															Proposed MRP :
														</Text>
														<View
															style={{
																...styles.td2,
																paddingBottom: 0,
																borderBottomWidth: 2,
																borderBottomColor: '#000',
																paddingTop: 4,
															}}
														>
															<TextInput
																name={'final'}
																style={styles.input}
																value={discussedMRP || ''}
																keyboardType="numeric"
																onChangeText={text => {
																	this.handleDiscussed(text);
																}}
															/>
														</View>
													</View>
													<View style={styles.tr}>
														<Text
															style={{
																...styles.td2,
																fontWeight: 'bold',
															}}
														>
															Proposed Discount :
														</Text>
														<View
															style={{
																...styles.td2,
																paddingBottom: 0,
																paddingTop: 4,
																borderBottomWidth: 2,
																borderBottomColor: '#000',
															}}
														>
															<TextInput
																name={'discount'}
																style={styles.input}
																value={discount || ''}
																keyboardType="numeric"
																onChangeText={text => {
																	this.handleDiscount(text);
																}}
															/>
														</View>
													</View>
													<View style={styles.tr}>
														<View style={styles.td2}>
															<Text>Gross Profit :</Text>
														</View>
														<View style={styles.td2}>
															<Text>{tier1val}</Text>
														</View>
													</View>
												</View>
											)}
										</View>
									</View>
								</ScrollView>
							</KeyboardAvoidingView>
						) : (
							<View style={styles.NoDataStyle}>
								<View style={{ width: '100%', top: 0, padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row' }}>
									<AntDesign name="arrowleft" size={25} color={'#000'} style={{ justifyContent: 'flex-start', marginTop: 20, paddingRight: 10 }} onPress={() => this.props.navigation.goBack()} />
								</View>
								<View style={styles.NoDataStyle}>
									<Icon style={{ fontSize: 100 }} name="gauge-empty" type="MaterialCommunityIcons" />
									<Text style={styles.not_available_text}>Data Not Available! Please Select Another Model</Text>
								</View>
							</View>
						)}

						{/* <View style={styles.container}> */}

						<View style={styles.modelSelect}>
							<TouchableOpacity onPress={this.onModalClick}>
								<Text style={styles.modalButton}>Select Model</Text>
							</TouchableOpacity>
							<MyModel
								onSelected={this.onSelected}
								modelData={searchModelData && this.state.searchModelData}
								handleChange={this.handleSearch}
								modalVisible={this.state.modalVisible}
								onModelClick={this.onModalClick}
							/>
						</View>

						{role === 'admin' && (
							<Modal
								animationType="slide"
								transparent={false}
								visible={this.state.detailModal}
								onRequestClose={() => {
									this.onDetailModal();
								}}
							>
								<View style={styles.detailmodalWrapper}>
									<ScrollView>
										<TouchableHighlight
											onPress={() => {
												this.onDetailModal();
											}}
										>
											<Text
												style={{
													...styles.modalButton,
													backgroundColor: 'red',
													width: '25%',
													marginBottom: 10,
													marginLeft: 10,
												}}
											>
												Close
											</Text>
										</TouchableHighlight>
										{generalData && (
											<View style={styles.table}>
												<View style={styles.thead}>
													<View style={styles.tr}>
														<View
															style={{
																...styles.th,
																width: '33.33%',
																color: '#fff',
																backgroundColor: '#ffc000',
															}}
														>
															<Text>Details</Text>
														</View>
														<View
															style={{
																...styles.th,
																width: '33.33%',
																color: '#fff',
																backgroundColor: '#ffc000',
															}}
														>
															<Text>CUR / %</Text>
														</View>
														<View
															style={{
																...styles.th,
																width: '33.33%',
																color: '#fff',
																backgroundColor: '#00b0f0',
															}}
														>
															<Text>{this.state.busName || 'Model Name'}</Text>
														</View>
													</View>
												</View>
												<View style={styles.tbody}>
													{parameterDetail.map(m => (
														<View style={styles.tr} key={m.id}>
															<View
																style={{
																	...styles.td,
																	width: '33.33%',
																	backgroundColor:
																		m.id == 'service'
																			? '#ffff00'
																			: m.id == 'exRate'
																			? '#f2f2f2'
																			: m.id == 'boarderInPrice'
																			? '#f2f2f2'
																			: m.id == 'warrenty'
																			? '#ffff00'
																			: m.id == 'IndcustomC'
																			? '#ffff00'
																			: m.id == 'stockYard'
																			? '#ffff00'
																			: m.id == 'stockTrans'
																			? '#ffff00'
																			: m.id == 'interestInvestV'
																			? '#f7caac'
																			: m.id == 'priceBeforeVat'
																			? '#ffff00'
																			: m.id == 'suitableMRP'
																			? '#c5e0b3'
																			: m.id == 'overhead'
																			? '#ffc000'
																			: m.id == 'withoutOverhead'
																			? '#ffc000'
																			: m.id == 'credit'
																			? '#ffc000'
																			: m.id == 'costTillDealer'
																			? '#f2f2f2'
																			: m.id == 'totalLandingCost'
																			? '#f2f2f2'
																			: '',
																}}
															>
																<Text
																	style={{
																		fontWeight:
																			m.id == 'inr'
																				? '700'
																				: m.id == 'exRate'
																				? '700'
																				: m.id == 'boarderInPrice'
																				? '700'
																				: m.id == 'costTillDealer'
																				? '700'
																				: m.id == 'totalLandingCost'
																				? '700'
																				: m.id == 'priceBeforeVat'
																				? '700'
																				: m.id == 'overhead'
																				? '700'
																				: m.id == 'withoutOverhead'
																				? '700'
																				: m.id == 'credit'
																				? '700'
																				: '400',
																	}}
																>
																	{m.name}
																</Text>
															</View>
															<View
																style={{
																	...styles.td,
																	width: '33.33%',
																	backgroundColor:
																		m.id == 'service'
																			? '#ffff00'
																			: m.id == 'exRate'
																			? '#f2f2f2'
																			: m.id == 'boarderInPrice'
																			? '#f2f2f2'
																			: m.id == 'warrenty'
																			? '#ffff00'
																			: m.id == 'IndcustomC'
																			? '#ffff00'
																			: m.id == 'stockYard'
																			? '#ffff00'
																			: m.id == 'stockTrans'
																			? '#ffff00'
																			: m.id == 'interestInvestV'
																			? '#00b0f0'
																			: m.id == 'priceBeforeVat'
																			? '#ffff00'
																			: m.id == 'suitableMRP'
																			? '#c5e0b3'
																			: m.id == 'overhead'
																			? '#ffc000'
																			: m.id == 'withoutOverhead'
																			? '#ffc000'
																			: m.id == 'credit'
																			? '#ffc000'
																			: m.id == 'costTillDealer'
																			? '#f2f2f2'
																			: m.id == 'totalLandingCost'
																			? '#f2f2f2'
																			: '',
																}}
															>
																<Text
																	style={{
																		fontWeight:
																			m.id == 'inr'
																				? '700'
																				: m.id == 'exRate'
																				? '700'
																				: m.id == 'boarderInPrice'
																				? '700'
																				: m.id == 'costTillDealer'
																				? '700'
																				: m.id == 'totalLandingCost'
																				? '700'
																				: m.id == 'priceBeforeVat'
																				? '700'
																				: m.id == 'suitableMRP'
																				? '700'
																				: m.id == 'overhead'
																				? '700'
																				: m.id == 'withoutOverhead'
																				? '700'
																				: m.id == 'credit'
																				? '700'
																				: '400',
																	}}
																>
																	{generalData[`${m.id}V`] ? generalData[m.id] : m.id == 'exRate' ? generalData['exRate'] : ' '}
																</Text>
															</View>
															<View
																style={{
																	...styles.td,
																	width: '33.33%',
																	backgroundColor:
																		m.id == 'inr'
																			? '#00b0f0'
																			: m.id == 'exRate'
																			? '#f2f2f2'
																			: m.id == 'boarderInPrice'
																			? '#f2f2f2'
																			: m.id == 'service'
																			? '#ffff00'
																			: m.id == 'warrenty'
																			? '#ffff00'
																			: m.id == 'IndcustomC'
																			? '#ffff00'
																			: m.id == 'stockYard'
																			? '#ffff00'
																			: m.id == 'stockTrans'
																			? '#ffff00'
																			: m.id == 'interestInvestV'
																			? '#f7caac'
																			: m.id == 'priceBeforeVat'
																			? '#ffff00'
																			: m.id == 'suitableMRP'
																			? '#00b0f0'
																			: m.id == 'overhead'
																			? '#ffc000'
																			: m.id == 'withoutOverhead'
																			? '#ffc000'
																			: m.id == 'credit'
																			? '#ffc000'
																			: m.id == 'costTillDealer'
																			? '#f2f2f2'
																			: m.id == 'totalLandingCost'
																			? '#f2f2f2'
																			: '',
																}}
															>
																<Text
																	style={{
																		fontWeight:
																			m.id == 'inr'
																				? '700'
																				: m.id == 'exRate'
																				? '700'
																				: m.id == 'boarderInPrice'
																				? '700'
																				: m.id == 'costTillDealer'
																				? '700'
																				: m.id == 'totalLandingCost'
																				? '700'
																				: m.id == 'priceBeforeVat'
																				? '700'
																				: m.id == 'suitableMRP'
																				? '700'
																				: m.id == 'overhead'
																				? '700'
																				: m.id == 'withoutOverhead'
																				? '700'
																				: m.id == 'credit'
																				? '700'
																				: '400',
																		color: m.id == 'totalLandingCost' ? 'red' : m.id == 'priceBeforeVat' ? 'red' : '#000',
																	}}
																>
																	{generalData[`${m.id}V`] ? NepaliCurrency(generalData[`${m.id}V`]) : m.id == 'exRate' ? NepaliCurrency(generalData['npr']) : NepaliCurrency(generalData[m.id])}
																</Text>
															</View>
														</View>
													))}
												</View>
											</View>
										)}
									</ScrollView>
								</View>
							</Modal>
						)}
						{/* </View> */}
					</>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainscreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
	},

	table: {
		marginHorizontal: 10,
		marginBottom: 10,
		paddingTop: 5,
		borderLeftWidth: 0.5,
		borderLeftColor: '#666',
		borderTopWidth: 0.5,
		borderTopColor: '#666',
		borderRadius: 2,
	},
	table2: {
		marginHorizontal: 10,
		marginBottom: 10,
		paddingTop: 5,
		// borderLeftWidth: 0.5,
		// borderLeftColor: '#666',
		// borderTopWidth: 0.5,
		// borderTopColor: '#666',
		// borderRadius: 2,
	},
	thead: {
		textAlign: 'left',
	},
	tr: {
		flexDirection: 'row',
	},
	th: {
		fontWeight: 'bold',
		width: '50%',
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: '#666',
		borderRightWidth: 0.5,
		borderRightColor: '#666',
	},
	th2: {
		fontWeight: 'bold',
		width: '50%',
		paddingVertical: 10,
		paddingHorizontal: 10,
		// borderBottomWidth: 0.5,
		// borderBottomColor: '#666',
		// borderRightWidth: 0.5,
		// borderRightColor: '#666',
	},
	th1: {
		width: Dimensions.get('window').width - 20,
		margin: 10,
	},
	td: {
		textAlign: 'left',
		width: '50%',
		padding: 10,
		fontSize: 14,
		borderBottomWidth: 0.5,
		borderBottomColor: '#666',
		borderRightWidth: 0.5,
		borderRightColor: '#666',
	},
	td2: {
		textAlign: 'left',
		width: '50%',
		padding: 10,
		fontSize: 14,
		// borderBottomWidth: 0.5,
		// borderBottomColor: '#666',
		// borderRightWidth: 0.5,
		// borderRightColor: '#666',
	},
	modalButton: {
		backgroundColor: '#1D4CBC',
		color: '#fff',
		textAlign: 'center',
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center',
		letterSpacing: 1,
		fontWeight: 'bold',
		borderRadius: 30,
		fontFamily: 'NotoSerif',
	},
	modalWrapper: {
		paddingHorizontal: 20,
		marginTop: 20,
	},
	detailmodalWrapper: {
		marginTop: 20,
	},
	modalContainer: {
		borderBottomWidth: 1,
		borderBottomColor: '#000',
	},
	modalDetail: {
		paddingTop: 10,
		paddingBottom: 70,
	},
	modalDetailWrap: {
		paddingVertical: 25,
		paddingHorizontal: 2,
		borderBottomWidth: 0.5,
		borderBottomColor: '#666',
	},
	input: {
		margin: 0,
	},
	notAvailableText: {
		paddingVertical: 40,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 15,
	},
	container: {
		// flex: 1,
		backgroundColor: '#fff',
	},

	modelSelect: {
		position: 'absolute',
		bottom: 10,
		left: '10%',
		width: '80%',
	},
	NoDataStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	not_available_text: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		margin: 20,
		fontSize: 16,
		fontWeight: '700',
	},
});

export default General;
