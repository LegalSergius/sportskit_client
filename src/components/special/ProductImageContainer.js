import React from "react";
import '../../styles/regular/ProductPage.css';
import '../../styles/mobile/MobileProductPage.css';

export class ProductImageContainer extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           currentPhotoIndex: 0
       }
   }

    setSrcFile(fileIndex) {
        return "data:image/png;base64," + this.props.productMediaArray[fileIndex];
    }

    changeCurrentIndex(newPhotoIndex) {
        const LAST_INDEX = this.props.productMediaArray.length - 1;

        if (newPhotoIndex < 0) {
            newPhotoIndex = LAST_INDEX;
        } else if (newPhotoIndex > LAST_INDEX) {
            newPhotoIndex = 0;
        }
        this.setState({currentPhotoIndex: newPhotoIndex});
    }

   render() {
       const IS_MOBILE = this.props.isMobile;

       return (
           <div id={IS_MOBILE? "mobileProductImageContainer": ""}>
               <img
                   id={IS_MOBILE? "mobileProductImage" : "productImage"}
                   tabIndex="0"
                   src={this.setSrcFile(this.state.currentPhotoIndex)}
                   alt="Фотография продукта"/>
               {(this.props.productMediaArray.length > 1) &&
                   <div id={IS_MOBILE? "" : "scrollButtonsContainer"}>
                       <img
                           id={IS_MOBILE? "mobileProductSwitchLeft" : ""}
                           className={IS_MOBILE? "mobileProductPageSwitchButtons" : "scrollButtons"}
                           src="../../static/to_left.png"
                           onClick={() => this.changeCurrentIndex(--this.state.currentPhotoIndex)}
                           alt="Предыдущая фотография" />
                       <img
                           id={IS_MOBILE? "mobileProductSwitchRight" : ""}
                           className={IS_MOBILE? "mobileProductPageSwitchButtons" : "scrollButtons"}
                           src="../static/to_right.png"
                           onClick={() => this.changeCurrentIndex(++this.state.currentPhotoIndex)}
                           alt="Следущая фотография" />
                   </div>
               }
           </div>
       );
   }
}