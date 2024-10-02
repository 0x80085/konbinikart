package com.konbinikart;

import android.content.Context;
import android.content.res.Configuration;

public class DarkModeShim {

    public static String getMode(Context context) {
        int nightModeFlags = context.getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
        boolean isDarkModeOn = nightModeFlags == Configuration.UI_MODE_NIGHT_YES;
        return isDarkModeOn ? "Dark Mode" : "Light Mode";
    }
}