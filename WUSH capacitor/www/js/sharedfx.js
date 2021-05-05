const {Toast} = Capacitor.Plugins; //plugins


async function toast(text, durration_in_ms, position_top_right_left_bottom, offset_in_px) { //Produce toast messages
    await Toast.show({
        text
    });
    /*if (position_top_right_left_bottom == undefined) { position_top_right_left_bottom = 'bottom' }//default the position
    if (durration_in_ms == undefined) { durration_in_ms = 4000 }//default the duration
    if (offset_in_px == undefined) { offset_in_px = -160 }//default the offset
    window.plugins.toast.showWithOptions({ message: text, duration: durration_in_ms, position: position_top_right_left_bottom, addPixelsY: offset_in_px })*/
}