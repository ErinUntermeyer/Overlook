class User {
	checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : this.giveDefaultValue(dataType);
	}

	giveDefaultValue(dataType) {
		switch (dataType) {
			case 'number':
				return 0;
				break;
			case 'string':
				return 'Invalid';
				break;
			case 'object':
				return [];
				break;
		}
	}
}

export default User;