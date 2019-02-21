import React, { Component } from 'react';
import { View, ScrollView, Alert,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import { Item, Input, Icon, Text, H3, Picker, DatePicker, Button} from 'native-base';
import firebase from 'firebase';

const allCountry=[ 
    {name: 'Afghanistan', code: 'AF'}, 
    {name: 'Åland Islands', code: 'AX'}, 
    {name: 'Albania', code: 'AL'}, 
    {name: 'Algeria', code: 'DZ'}, 
    {name: 'American Samoa', code: 'AS'}, 
    {name: 'AndorrA', code: 'AD'}, 
    {name: 'Angola', code: 'AO'}, 
    {name: 'Anguilla', code: 'AI'}, 
    {name: 'Antarctica', code: 'AQ'}, 
    {name: 'Antigua and Barbuda', code: 'AG'}, 
    {name: 'Argentina', code: 'AR'}, 
    {name: 'Armenia', code: 'AM'}, 
    {name: 'Aruba', code: 'AW'}, 
    {name: 'Australia', code: 'AU'}, 
    {name: 'Austria', code: 'AT'}, 
    {name: 'Azerbaijan', code: 'AZ'}, 
    {name: 'Bahamas', code: 'BS'}, 
    {name: 'Bahrain', code: 'BH'}, 
    {name: 'Bangladesh', code: 'BD'}, 
    {name: 'Barbados', code: 'BB'}, 
    {name: 'Belarus', code: 'BY'}, 
    {name: 'Belgium', code: 'BE'}, 
    {name: 'Belize', code: 'BZ'}, 
    {name: 'Benin', code: 'BJ'}, 
    {name: 'Bermuda', code: 'BM'}, 
    {name: 'Bhutan', code: 'BT'}, 
    {name: 'Bolivia', code: 'BO'}, 
    {name: 'Bosnia and Herzegovina', code: 'BA'}, 
    {name: 'Botswana', code: 'BW'}, 
    {name: 'Bouvet Island', code: 'BV'}, 
    {name: 'Brazil', code: 'BR'}, 
    {name: 'British Indian Ocean Territory', code: 'IO'}, 
    {name: 'Brunei Darussalam', code: 'BN'}, 
    {name: 'Bulgaria', code: 'BG'}, 
    {name: 'Burkina Faso', code: 'BF'}, 
    {name: 'Burundi', code: 'BI'}, 
    {name: 'Cambodia', code: 'KH'}, 
    {name: 'Cameroon', code: 'CM'}, 
    {name: 'Canada', code: 'CA'}, 
    {name: 'Cape Verde', code: 'CV'}, 
    {name: 'Cayman Islands', code: 'KY'}, 
    {name: 'Central African Republic', code: 'CF'}, 
    {name: 'Chad', code: 'TD'}, 
    {name: 'Chile', code: 'CL'}, 
    {name: 'China', code: 'CN'}, 
    {name: 'Christmas Island', code: 'CX'}, 
    {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
    {name: 'Colombia', code: 'CO'}, 
    {name: 'Comoros', code: 'KM'}, 
    {name: 'Congo', code: 'CG'}, 
    {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
    {name: 'Cook Islands', code: 'CK'}, 
    {name: 'Costa Rica', code: 'CR'}, 
    {name: 'Cote D\'Ivoire', code: 'CI'}, 
    {name: 'Croatia', code: 'HR'}, 
    {name: 'Cuba', code: 'CU'}, 
    {name: 'Cyprus', code: 'CY'}, 
    {name: 'Czech Republic', code: 'CZ'}, 
    {name: 'Denmark', code: 'DK'}, 
    {name: 'Djibouti', code: 'DJ'}, 
    {name: 'Dominica', code: 'DM'}, 
    {name: 'Dominican Republic', code: 'DO'}, 
    {name: 'Ecuador', code: 'EC'}, 
    {name: 'Egypt', code: 'EG'}, 
    {name: 'El Salvador', code: 'SV'}, 
    {name: 'Equatorial Guinea', code: 'GQ'}, 
    {name: 'Eritrea', code: 'ER'}, 
    {name: 'Estonia', code: 'EE'}, 
    {name: 'Ethiopia', code: 'ET'}, 
    {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
    {name: 'Faroe Islands', code: 'FO'}, 
    {name: 'Fiji', code: 'FJ'}, 
    {name: 'Finland', code: 'FI'}, 
    {name: 'France', code: 'FR'}, 
    {name: 'French Guiana', code: 'GF'}, 
    {name: 'French Polynesia', code: 'PF'}, 
    {name: 'French Southern Territories', code: 'TF'}, 
    {name: 'Gabon', code: 'GA'}, 
    {name: 'Gambia', code: 'GM'}, 
    {name: 'Georgia', code: 'GE'}, 
    {name: 'Germany', code: 'DE'}, 
    {name: 'Ghana', code: 'GH'}, 
    {name: 'Gibraltar', code: 'GI'}, 
    {name: 'Greece', code: 'GR'}, 
    {name: 'Greenland', code: 'GL'}, 
    {name: 'Grenada', code: 'GD'}, 
    {name: 'Guadeloupe', code: 'GP'}, 
    {name: 'Guam', code: 'GU'}, 
    {name: 'Guatemala', code: 'GT'}, 
    {name: 'Guernsey', code: 'GG'}, 
    {name: 'Guinea', code: 'GN'}, 
    {name: 'Guinea-Bissau', code: 'GW'}, 
    {name: 'Guyana', code: 'GY'}, 
    {name: 'Haiti', code: 'HT'}, 
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
    {name: 'Holy See (Vatican City State)', code: 'VA'}, 
    {name: 'Honduras', code: 'HN'}, 
    {name: 'Hong Kong', code: 'HK'}, 
    {name: 'Hungary', code: 'HU'}, 
    {name: 'Iceland', code: 'IS'}, 
    {name: 'India', code: 'IN'}, 
    {name: 'Indonesia', code: 'ID'}, 
    {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
    {name: 'Iraq', code: 'IQ'}, 
    {name: 'Ireland', code: 'IE'}, 
    {name: 'Isle of Man', code: 'IM'}, 
    {name: 'Israel', code: 'IL'}, 
    {name: 'Italy', code: 'IT'}, 
    {name: 'Jamaica', code: 'JM'}, 
    {name: 'Japan', code: 'JP'}, 
    {name: 'Jersey', code: 'JE'}, 
    {name: 'Jordan', code: 'JO'}, 
    {name: 'Kazakhstan', code: 'KZ'}, 
    {name: 'Kenya', code: 'KE'}, 
    {name: 'Kiribati', code: 'KI'}, 
    {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
    {name: 'Korea, Republic of', code: 'KR'}, 
    {name: 'Kuwait', code: 'KW'}, 
    {name: 'Kyrgyzstan', code: 'KG'}, 
    {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
    {name: 'Latvia', code: 'LV'}, 
    {name: 'Lebanon', code: 'LB'}, 
    {name: 'Lesotho', code: 'LS'}, 
    {name: 'Liberia', code: 'LR'}, 
    {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
    {name: 'Liechtenstein', code: 'LI'}, 
    {name: 'Lithuania', code: 'LT'}, 
    {name: 'Luxembourg', code: 'LU'}, 
    {name: 'Macao', code: 'MO'}, 
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
    {name: 'Madagascar', code: 'MG'}, 
    {name: 'Malawi', code: 'MW'}, 
    {name: 'Malaysia', code: 'MY'}, 
    {name: 'Maldives', code: 'MV'}, 
    {name: 'Mali', code: 'ML'}, 
    {name: 'Malta', code: 'MT'}, 
    {name: 'Marshall Islands', code: 'MH'}, 
    {name: 'Martinique', code: 'MQ'}, 
    {name: 'Mauritania', code: 'MR'}, 
    {name: 'Mauritius', code: 'MU'}, 
    {name: 'Mayotte', code: 'YT'}, 
    {name: 'Mexico', code: 'MX'}, 
    {name: 'Micronesia, Federated States of', code: 'FM'}, 
    {name: 'Moldova, Republic of', code: 'MD'}, 
    {name: 'Monaco', code: 'MC'}, 
    {name: 'Mongolia', code: 'MN'}, 
    {name: 'Montserrat', code: 'MS'}, 
    {name: 'Morocco', code: 'MA'}, 
    {name: 'Mozambique', code: 'MZ'}, 
    {name: 'Myanmar', code: 'MM'}, 
    {name: 'Namibia', code: 'NA'}, 
    {name: 'Nauru', code: 'NR'}, 
    {name: 'Nepal', code: 'NP'}, 
    {name: 'Netherlands', code: 'NL'}, 
    {name: 'Netherlands Antilles', code: 'AN'}, 
    {name: 'New Caledonia', code: 'NC'}, 
    {name: 'New Zealand', code: 'NZ'}, 
    {name: 'Nicaragua', code: 'NI'}, 
    {name: 'Niger', code: 'NE'}, 
    {name: 'Nigeria', code: 'NG'}, 
    {name: 'Niue', code: 'NU'}, 
    {name: 'Norfolk Island', code: 'NF'}, 
    {name: 'Northern Mariana Islands', code: 'MP'}, 
    {name: 'Norway', code: 'NO'}, 
    {name: 'Oman', code: 'OM'}, 
    {name: 'Pakistan', code: 'PK'}, 
    {name: 'Palau', code: 'PW'}, 
    {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
    {name: 'Panama', code: 'PA'}, 
    {name: 'Papua New Guinea', code: 'PG'}, 
    {name: 'Paraguay', code: 'PY'}, 
    {name: 'Peru', code: 'PE'}, 
    {name: 'Philippines', code: 'PH'}, 
    {name: 'Pitcairn', code: 'PN'}, 
    {name: 'Poland', code: 'PL'}, 
    {name: 'Portugal', code: 'PT'}, 
    {name: 'Puerto Rico', code: 'PR'}, 
    {name: 'Qatar', code: 'QA'}, 
    {name: 'Reunion', code: 'RE'}, 
    {name: 'Romania', code: 'RO'}, 
    {name: 'Russian Federation', code: 'RU'}, 
    {name: 'RWANDA', code: 'RW'}, 
    {name: 'Saint Helena', code: 'SH'}, 
    {name: 'Saint Kitts and Nevis', code: 'KN'}, 
    {name: 'Saint Lucia', code: 'LC'}, 
    {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
    {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
    {name: 'Samoa', code: 'WS'}, 
    {name: 'San Marino', code: 'SM'}, 
    {name: 'Sao Tome and Principe', code: 'ST'}, 
    {name: 'Saudi Arabia', code: 'SA'}, 
    {name: 'Senegal', code: 'SN'}, 
    {name: 'Serbia and Montenegro', code: 'CS'}, 
    {name: 'Seychelles', code: 'SC'}, 
    {name: 'Sierra Leone', code: 'SL'}, 
    {name: 'Singapore', code: 'SG'}, 
    {name: 'Slovakia', code: 'SK'}, 
    {name: 'Slovenia', code: 'SI'}, 
    {name: 'Solomon Islands', code: 'SB'}, 
    {name: 'Somalia', code: 'SO'}, 
    {name: 'South Africa', code: 'ZA'}, 
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
    {name: 'Spain', code: 'ES'}, 
    {name: 'Sri Lanka', code: 'LK'}, 
    {name: 'Sudan', code: 'SD'}, 
    {name: 'Suriname', code: 'SR'}, 
    {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
    {name: 'Swaziland', code: 'SZ'}, 
    {name: 'Sweden', code: 'SE'}, 
    {name: 'Switzerland', code: 'CH'}, 
    {name: 'Syrian Arab Republic', code: 'SY'}, 
    {name: 'Taiwan, Province of China', code: 'TW'}, 
    {name: 'Tajikistan', code: 'TJ'}, 
    {name: 'Tanzania, United Republic of', code: 'TZ'}, 
    {name: 'Thailand', code: 'TH'}, 
    {name: 'Timor-Leste', code: 'TL'}, 
    {name: 'Togo', code: 'TG'}, 
    {name: 'Tokelau', code: 'TK'}, 
    {name: 'Tonga', code: 'TO'}, 
    {name: 'Trinidad and Tobago', code: 'TT'}, 
    {name: 'Tunisia', code: 'TN'}, 
    {name: 'Turkey', code: 'TR'}, 
    {name: 'Turkmenistan', code: 'TM'}, 
    {name: 'Turks and Caicos Islands', code: 'TC'}, 
    {name: 'Tuvalu', code: 'TV'}, 
    {name: 'Uganda', code: 'UG'}, 
    {name: 'Ukraine', code: 'UA'}, 
    {name: 'United Arab Emirates', code: 'AE'}, 
    {name: 'United Kingdom', code: 'GB'}, 
    {name: 'United States', code: 'US'}, 
    {name: 'United States Minor Outlying Islands', code: 'UM'}, 
    {name: 'Uruguay', code: 'UY'}, 
    {name: 'Uzbekistan', code: 'UZ'}, 
    {name: 'Vanuatu', code: 'VU'}, 
    {name: 'Venezuela', code: 'VE'}, 
    {name: 'Viet Nam', code: 'VN'}, 
    {name: 'Virgin Islands, British', code: 'VG'}, 
    {name: 'Virgin Islands, U.S.', code: 'VI'}, 
    {name: 'Wallis and Futuna', code: 'WF'}, 
    {name: 'Western Sahara', code: 'EH'}, 
    {name: 'Yemen', code: 'YE'}, 
    {name: 'Zambia', code: 'ZM'}, 
    {name: 'Zimbabwe', code: 'ZW'} 
  ];
export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //first screen
            firstName: '',
            lastName: '',
            gender: 'male',
            dob: '',
            height: '4.1',
            phoneNumber: '',
            martialStatus: 'Married',
            highestEducation: 'Graduation',
            //second screen
            state: '',
            city: '',
            pincode: '',
            language: 'Hindi',
            religion: 'Hindu',
            screen: 1,
            userId: '',
            country:'India'
        };
    }

    componentWillMount = () => {
        this.setState({ userId: this.props.navigation.state.params.userId });
    }


    firstScreenHandler=()=>{
        if(this.state.firstName.trim()=='' || this.state.lastName.trim()=='' || this.state.phoneNumber.trim()==='' || this.state.dob.toString().trim()==null){
            console.log("EMPTY field");
            Alert.alert(
                'Details Not Valid',
               "Please Fill all fields",
                [
                  {text: 'Try Again', onPress: () => console.log('Trying again')},
                ],
                { cancelable: false }
              );      
        }
        else{
            console.log(this.state.firstName);
            console.log(this.state.lastName);
            console.log("All field filled");
            this.setState({ screen: 2 });
        }
    }

    dataShow = () => {
        if (this.state.state.trim()=='' || this.state.city.trim()=='' || this.state.pincode.trim()=='') {
            Alert.alert(
                'Details Not Valid',
               "Please Fill all fields",
                [
                  {text: 'Try Again', onPress: () => console.log('Trying again')},
                ],
                { cancelable: false }
              );
        }
        else {
            try {
                firebase.database().ref('user/' + this.state.userId).set(
                    {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        gender: this.state.gender,
                        dob: this.state.dob.toString().substr(4, 12),
                        height: this.state.height,
                        phoneNumber: this.state.phoneNumber,
                        martialStatus: this.state.martialStatus,
                        highestEducation: this.state.highestEducation,
                        state: this.state.state,
                        city: this.state.city,
                        pincode: this.state.pincode,
                        language: this.state.language,
                        religion: this.state.religion,
                        userId: this.state.userId,
                        profileImage:'https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person',
                        country: this.state.country
                    }
                ).then((result) => {
                    this.props.navigation.replace('ImageUpload', {
                        userId: this.state.userId
                    });
                    console.log("INSERTED"+result);
                })
            }
            catch (error) {
                console.log("Something went wrong while user deatils form" + error);
            }
        }
    }

    render() {
        const firstScreen = <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
            <H3 style={{ textAlign: 'center', marginBottom: 15, marginTop: 10, color: '#E91E63' }}>Tell Us more about you</H3>
            <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
                <ScrollView>
                    <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#27ae60', padding: 10, marginBottom: 20 }}>
                        <Item success>
                            <Input placeholder='First Name'
                                onChangeText={(e) => { this.setState({ firstName: e }) }}
                                value={this.state.firstName} />
                        </Item>
                        <Item success>
                            <Input placeholder='Last name'
                                onChangeText={(e) => { this.setState({ lastName: e }) }}
                                value={this.state.lastName} />
                        </Item>
                        <Item success>
                            <Input placeholder='Phone Number'
                                maxLength={10}
                                onChangeText={(e) => { this.setState({ phoneNumber: e }) }}
                                value={this.state.phoneNumber}
                                keyboardType='number-pad' />
                        </Item>
                        <Item picker success>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.gender}
                                onValueChange={(e) => this.setState({ gender: e })}
                            >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </Item>
                        <DatePicker
                            style={{marginBottom:9,marginTop:10}}
                            defaultDate={new Date(1999, 6, 4)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="  Date Of Birth"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#27ae60" }}
                            onDateChange={(e) =>{ 
                                console.log(e);
                                this.setState({ dob : e });
                            }}
                        />
                    </View>
                    <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#2980b9', padding: 10, marginBottom: 20 }}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Height"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.height}
                                onValueChange={(e) => this.setState({ height: e })}
                            >
                                <Picker.Item label="4.1" value="4.1" />
                                <Picker.Item label="4.2" value="4.2" />
                                <Picker.Item label="4.3" value="4.3" />
                                <Picker.Item label="4.4" value="4.4" />
                                <Picker.Item label="4.5" value="4.5" />
                                <Picker.Item label="4.6" value="4.6" />
                                <Picker.Item label="4.7" value="4.7" />
                                <Picker.Item label="4.8" value="4.8" />
                                <Picker.Item label="4.9" value="4.9" />
                                <Picker.Item label="5.0" value="5.0" />
                                <Picker.Item label="5.1" value="5.1" />
                                <Picker.Item label="5.2" value="5.2" />
                                <Picker.Item label="5.3" value="5.3" />
                                <Picker.Item label="5.4" value="5.4" />
                                <Picker.Item label="5.5" value="5.5" />
                                <Picker.Item label="5.6" value="5.6" />
                                <Picker.Item label="5.7" value="5.7" />
                                <Picker.Item label="5.8" value="5.8" />
                                <Picker.Item label="5.9" value="5.9" />
                                <Picker.Item label="6.0" value="6.0" />
                                <Picker.Item label="6.1" value="6.1" />
                                <Picker.Item label="6.2" value="6.2" />
                                <Picker.Item label="6.3" value="6.3" />
                                <Picker.Item label="6.4" value="6.4" />
                            </Picker>
                        </Item>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Maritial Status"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.martialStatus}
                                onValueChange={(e) => this.setState({ martialStatus: e })}
                            >
                                <Picker.Item label="Married" value="Married" />
                                <Picker.Item label="Unmarried" value="Unmarried" />
                                <Picker.Item label="Divorced" value="Divorced" />
                            </Picker>
                        </Item>
                    </View>
                    <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#8e44ad', padding: 10, marginBottom: 20 }}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Education"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.highestEducation}
                                onValueChange={(e) => this.setState({ highestEducation: e })}
                            >
                                <Picker.Item label="Under Graduate" value="Graduate" />
                                <Picker.Item label="Graduation" value="Graduation" />
                                <Picker.Item label="Post Graduation" value="Post Graduation" />
                                <Picker.Item label="PHD" value="PHD" />
                            </Picker>
                        </Item>
                    </View>
                </ScrollView>
                <Button iconRight
                    style={{ width: '100%', textAlign: 'center', marginTop: 40, borderRadius: 15, backgroundColor: '#E91E63' }}
                    onPress={() => this.firstScreenHandler()}>
                    <Text style={{ paddingLeft: "40%" }}>Some more</Text>
                    <Icon name='arrow-forward' />
                </Button>
            </View>
        </View>
        const secondScreen = <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
            <H3 style={{ textAlign: 'center', marginBottom: 15, marginTop: 10, color: '#E91E63' }}>Little more</H3>
            <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
                <ScrollView>
                    <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#27ae60', padding: 10, marginBottom: 20 }}>
                    <Item picker success>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Country"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.country}
                                onValueChange={(e) => this.setState({ country: e })}
                            >
                            {allCountry.map((result)=><Picker.Item label={result.name} value={result.name} />)}                               
                            </Picker>
                        </Item>
                        <Item success>
                            <Input placeholder='State'
                                onChangeText={(e) => this.setState({ state: e })}
                                value={this.state.state} />
                        </Item>
                        <Item success>
                            <Input placeholder='City'
                                onChangeText={(e) => this.setState({ city: e })}
                                value={this.state.city} />
                        </Item>
                        <Item success style={{marginBottom:6}}>
                            <Input placeholder='Pin Code'
                                onChangeText={(e) => this.setState({ pincode: e })}
                                value={this.state.pincode}
                                keyboardType={'numeric'} />
                        </Item>
                    </View>
                    <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#2980b9', padding: 10, marginBottom: 20 }}>
                        <Text style={{fontSize:14,textAlign:'center',marginTop:10}}>Mother Tongue</Text>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Language"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.language}
                                onValueChange={(e) => this.setState({ language: e })}
                            >
                                <Picker.Item label="Hindi" value="Hindi" />
                                <Picker.Item label="English" value="English" />
                                <Picker.Item label="Urdu" value="Urdu" />
                            </Picker>
                        </Item>
                        <Text style={{fontSize:14,textAlign:'center',marginTop:15}}>Religion</Text>
                        <Item picker style={{marginBottom:5}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Religion"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.religion}
                                onValueChange={(e) => this.setState({ religion: e })}
                            >
                                <Picker.Item label="Hindu" value="hindu" />
                                <Picker.Item label="Muslim" value="muslim" />
                                <Picker.Item label="Sikh" value="sikh" />
                                <Picker.Item label="don't believe" value="Don't Believe" />
                            </Picker>
                        </Item>
                    </View>
                </ScrollView>
                <Button iconRight
                    style={{ width: '100%', textAlign: 'center', marginTop: 40, borderRadius: 15, backgroundColor: '#E91E63' }}
                    onPress={() => this.dataShow()}>
                    <Text style={{ paddingLeft: "40%" }}>Let's Start</Text>
                    <Icon name='arrow-forward' />
                </Button>
            </View>
        </View>
        return (
            <View style={{ flex: 1 }}>
                {this.state.screen == 1 ? firstScreen : secondScreen}
            </View>
        );
    }
}