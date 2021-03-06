import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { DataTable } from 'react-native-paper';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { NepaliCurrency } from '../../components/utils/NepaliCurrency';

class ModelTable extends Component {
	state = {
		currentPage: 0,
	};

	onPageChange = val => {
		this.setState({ currentPage: val });
	};

	maxPage = () => {
		const { currentPage } = this.state;
		return currentPage > this.props.data.length / 10 ? true : false;
	};

	render() {
		return (
			<View style={styles.screen}>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Name</DataTable.Title>
						<DataTable.Title numeric>Price</DataTable.Title>
					</DataTable.Header>

					{this.props.data.map((row, index) => (
						<TouchableHighlight key={index} onPress={() => this.props.clicked(row)}>
							<DataTable.Row>
								<DataTable.Cell>{row.model}</DataTable.Cell>
								<DataTable.Cell numeric>{NepaliCurrency(row.inr)}</DataTable.Cell>
							</DataTable.Row>
						</TouchableHighlight>
					))}
				</DataTable>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		paddingVertical: 20,
	},
	iconWrappper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default ModelTable;
