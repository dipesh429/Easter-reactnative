import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native';

import { Form, Spinner, Icon } from 'native-base';
import { generateJSX } from '../components/utils/Views';
import { dropdownFormat } from '../components/utils/generals';
import { modelCollection, parameter } from '../components/utils/config';
import MyFormik from '../components/myFormik';
import ModelDropdown from './Setup/modelDropdown';
import { getModel, getValModel } from '../components/services/addModelService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { bURL } from '../components/app-config';
import MyModel from '../components/utils/MyModel';
import { AntDesign, Ionicons } from '@expo/vector-icons';

class ModalSetup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			optionVal: '',
			modelData: null,
			searchModelData: null,
			mainData: null,
			errors: {},
			mainloading: false,
			loading: true,
			modalVisible: false,
		};
	}

	static navigationOptions = () => ({
		headerShown: false,
	});

	setStateFromOtherFile = (option, value) => {
		this.setState({ [option]: value });
	};

	componentDidMount = async () => {
		try {
			const { data: modelData } = await getModel();
			this.setState({ modelData: modelData.data, searchModelData: modelData.data, loading: false });
		} catch (err) {
			this.setState({ errors: err });
		}
	};

	Burl = `${bURL}api/vehiclemodel`;

	default = {};

	generateForm = (values, handleChange, setFieldValue) => {
		let FormGroup = [];
		return parameter.map((each, ind) => {
			if (each.default != '') {
				this.default[each.id] = each.default;
			}

			return generateJSX(each.type, each.name, each.name, each.id, values, handleChange, each.icon, each.iconType, setFieldValue, each.id, ind);
		});
	};

	valueSelected = async val => {
		try {
			this.setState({ optionVal: val, mainloading: true, modalVisible: false });
			const { data: mainData } = await getValModel(val);
			this.setState({ mainData: mainData.data, mainloading: false });
		} catch (err) {
			this.setState({ errors: err });
		}
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

	onModalClick = () => {
		this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
	};

	render() {
		const { mainData, optionVal, searchModelData, modelData, loading, mainloading } = this.state;

		let ModelSetupFormComponent = props => {
			const { handleChange, values, handleSubmit, setFieldValue, isSubmitting } = props.props;
			return (
				<View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 5, paddingBottom: 80 }}>
					<View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center' }}>
						<AntDesign
							name="arrowleft"
							size={25}
							color={'#000'}
							style={{ width: '15%', justifyContent: 'flex-start', marginTop: 15, paddingRight: 10 }}
							onPress={() => this.props.navigation.goBack()}
						/>
						<Text style={{ ...styles.title, width: '75%', fontSize: 15, textAlign: 'center', marginTop: 20 }}>{`${this.state.optionVal} Parameter`} :</Text>
						<View style={{ height: 30, width: 30, borderRadius: 1, marginTop: 18 }}>
							<Ionicons name="md-save" color="green" onPress={handleSubmit} size={35} />
						</View>
					</View>
					<KeyboardAvoidingView behavior="position">
						<ScrollView>
							<Form>
								<View style={{ flex: 1 }}>{this.generateForm(values, handleChange, setFieldValue)}</View>
								{isSubmitting && <Spinner color="green" />}
							</Form>
						</ScrollView>
					</KeyboardAvoidingView>
				</View>
			);
		};

		return (
			<View style={styles.screen}>
				{loading ? (
					<View style={styles.mainscreen}>
						<ActivityIndicator size={40} color={'#0c4ca3'} />
					</View>
				) : (
					<>
						{mainloading ? (
							<View style={styles.mainscreen}>
								<ActivityIndicator size={40} color={'#0c4ca3'} />
							</View>
						) : mainData ? (
							<View style={styles.formikStyle}>
								<MyFormik history={this.props.history} model={optionVal} navigation={this.props.navigation} Furl={this.Furl} Burl={this.Burl} process={true} initial={mainData}>
									{props => <ModelSetupFormComponent props={props} />}
								</MyFormik>
							</View>
						) : (
							<View style={styles.NoDataStyle}>
								<View style={{ width: '100%', top: 0, padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row' }}>
									<AntDesign name="arrowleft" size={25} color={'#000'} style={{ justifyContent: 'flex-start', marginTop: 25, paddingRight: 10 }} onPress={() => this.props.navigation.goBack()} />
								</View>
								<View style={styles.NoDataStyle}>
									<Icon style={{ fontSize: 100 }} name="gauge-empty" type="MaterialCommunityIcons" />
									<Text style={styles.not_available_text}>Data Not Available! Please Select Another Model</Text>
								</View>
							</View>
						)}

						{modelData && searchModelData && (
							<View style={styles.modelSelect}>
								<TouchableOpacity onPress={this.onModalClick}>
									<Text style={styles.modalButton}>Select Model</Text>
								</TouchableOpacity>
								<MyModel onSelected={this.valueSelected} modelData={searchModelData} modalVisible={this.state.modalVisible} handleChange={this.handleSearch} onModelClick={this.onModalClick} />
							</View>
						)}
					</>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// margin: 10,
		// padding: 5,
	},
	mainscreen: {
		flex: 1,
		paddingBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	title: {
		fontSize: 18,
		paddingBottom: 5,
		fontWeight: '700',
		letterSpacing: 0.5,
		color: '#0c4ca3',
	},

	not_available_text: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		margin: 20,
		fontSize: 16,
		fontWeight: '700',
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
	NoDataStyle: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modelSelect: {
		position: 'absolute',
		bottom: 10,
		left: '10%',
		width: '80%',
	},
	formikStyle: {
		flex: 4,
		marginBottom: 100,
	},
});

export default ModalSetup;
