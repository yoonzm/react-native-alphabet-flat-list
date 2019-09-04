/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 19-9-4
 * Time: 下午5:18
 * Desc:
 */
import Toast from 'react-native-root-toast';

let toast = null;

export default {
  show(content: string) {
    if (toast) {
      Toast.hide(toast);
    }
    toast = Toast.show(content, {
      position: Toast.positions.CENTER,
      duration: 1000,
      shadow: false,
      opacity: 1,
      containerStyle: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
      },
      textStyle: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
      }
    });
  }
}
