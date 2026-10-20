namespace DevilishServices.DfbhdUpdater;

internal enum UpdateProfile
{
    DfbhdServer,
    Dfbhd,
    DfbhdTs
}

internal static class UpdateProfileExtensions
{
    public static string DisplayName(this UpdateProfile profile) =>
        profile switch
        {
            UpdateProfile.DfbhdServer => "DFBHD Server",
            UpdateProfile.Dfbhd => "DFBHD",
            UpdateProfile.DfbhdTs => "DFBHDTS",
            _ => profile.ToString()
        };

    public static string FileToken(this UpdateProfile profile) =>
        profile switch
        {
            UpdateProfile.DfbhdServer => "server",
            UpdateProfile.Dfbhd => "dfbhd",
            UpdateProfile.DfbhdTs => "dfbhdts",
            _ => "unknown"
        };
}
