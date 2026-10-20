using System.Drawing;

namespace DevilishServices.DfbhdUpdater;

internal sealed class MainForm : Form
{
    private readonly AppSettings _settings;

    private readonly RadioButton _serverRadio = new();
    private readonly RadioButton _dfbhdRadio = new();
    private readonly RadioButton _tsRadio = new();

    private readonly TextBox _serverPath = new();
    private readonly TextBox _dfbhdPath = new();
    private readonly TextBox _tsPath = new();

    private readonly GroupBox _graphicsGroup = new();
    private readonly ComboBox _resolutionPreset = new();
    private readonly NumericUpDown _customWidth = new();
    private readonly NumericUpDown _customHeight = new();
    private readonly ComboBox _refreshRate = new();
    private readonly CheckBox _borderless = new();
    private readonly CheckBox _vsync = new();
    private readonly CheckBox _anisotropic = new();
    private readonly ComboBox _antiAliasing = new();

    private readonly RichTextBox _output = new();

    private readonly Button _scanButton = new();
    private readonly Button _installButton = new();
    private readonly Button _restoreButton = new();

    public MainForm()
    {
        _settings = SettingsStore.Load();

        Text = "Devilish Services DFBHD Update 1.8.0.0";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(940, 720);
        Size = new Size(1100, 860);
        Font = new Font("Segoe UI", 9F);
        AutoScaleMode = AutoScaleMode.Dpi;

        BuildUi();
        LoadSettingsIntoUi();
        UpdateGraphicsEnabledState();
    }

    private void BuildUi()
    {
        var root = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            Padding = new Padding(14),
            ColumnCount = 1,
            RowCount = 6
        };

        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));

        Controls.Add(root);

        var heading = new Label
        {
            AutoSize = true,
            Text = "Devil DFBHD Engine / Updater 1.8.0.0",
            Font = new Font(Font.FontFamily, 16F, FontStyle.Bold),
            Margin = new Padding(0, 0, 0, 4)
        };

        var subheading = new Label
        {
            AutoSize = true,
            Text = "Direct3D 12 translation, high-resolution controls, file-version stamping and verified engine patches.",
            Margin = new Padding(0, 0, 0, 12)
        };

        var headingPanel = new FlowLayoutPanel
        {
            Dock = DockStyle.Top,
            AutoSize = true,
            FlowDirection = FlowDirection.TopDown,
            WrapContents = false
        };

        headingPanel.Controls.Add(heading);
        headingPanel.Controls.Add(subheading);
        root.Controls.Add(headingPanel, 0, 0);

        var profileGroup = new GroupBox
        {
            Text = "Installation profile",
            Dock = DockStyle.Top,
            AutoSize = true,
            Padding = new Padding(12)
        };

        var profileTable = new TableLayoutPanel
        {
            Dock = DockStyle.Top,
            AutoSize = true,
            ColumnCount = 3,
            RowCount = 3
        };

        profileTable.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 150F));
        profileTable.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));
        profileTable.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 130F));

        ConfigureProfileRow(
            profileTable,
            0,
            _serverRadio,
            "DFBHD Server",
            _serverPath,
            () => BrowseFor(UpdateProfile.DfbhdServer));

        ConfigureProfileRow(
            profileTable,
            1,
            _dfbhdRadio,
            "DFBHD",
            _dfbhdPath,
            () => BrowseFor(UpdateProfile.Dfbhd));

        ConfigureProfileRow(
            profileTable,
            2,
            _tsRadio,
            "DFBHDTS",
            _tsPath,
            () => BrowseFor(UpdateProfile.DfbhdTs));

        _serverRadio.CheckedChanged += (_, _) => UpdateGraphicsEnabledState();
        _dfbhdRadio.CheckedChanged += (_, _) => UpdateGraphicsEnabledState();
        _tsRadio.CheckedChanged += (_, _) => UpdateGraphicsEnabledState();

        _dfbhdRadio.Checked = true;

        profileGroup.Controls.Add(profileTable);
        root.Controls.Add(profileGroup, 0, 1);

        BuildGraphicsGroup();
        root.Controls.Add(_graphicsGroup, 0, 2);

        var buttonPanel = new FlowLayoutPanel
        {
            Dock = DockStyle.Top,
            AutoSize = true,
            FlowDirection = FlowDirection.LeftToRight,
            Padding = new Padding(0, 10, 0, 10)
        };

        ConfigureActionButton(_scanButton, "Scan Installation", ScanSelected);
        ConfigureActionButton(_installButton, "Install Update", InstallSelected);
        ConfigureActionButton(_restoreButton, "Restore Last Backup", RestoreSelected);

        buttonPanel.Controls.Add(_scanButton);
        buttonPanel.Controls.Add(_installButton);
        buttonPanel.Controls.Add(_restoreButton);

        root.Controls.Add(buttonPanel, 0, 3);

        _output.Dock = DockStyle.Fill;
        _output.ReadOnly = true;
        _output.WordWrap = true;
        _output.BackColor = SystemColors.Window;
        _output.Font = new Font("Consolas", 9F);
        _output.Text =
            "Ready." +
            Environment.NewLine +
            Environment.NewLine +
            "DFBHD Server: verified engine patches + 125 Hz scheduler; no graphics wrapper." +
            Environment.NewLine +
            "DFBHD Client: engine patches + NPC replication fix + Direct3D 12 translation." +
            Environment.NewLine +
            "DFBHDTS: safety mode; generic LAA + Direct3D 12 translation only." +
            Environment.NewLine +
            Environment.NewLine +
            "High-resolution rendering can use desktop native, 1080p, 1440p, ultrawide, 4K, 5K/8K or custom dimensions.";

        root.Controls.Add(_output, 0, 4);

        var footer = new Label
        {
            Dock = DockStyle.Top,
            AutoSize = true,
            Text =
                "Backups are stored in .devil-dfbhd-backups. " +
                "Unknown engine bytes abort without writing dfbhd.exe. " +
                "The Windows FileVersion/ProductVersion is stamped separately from the multiplayer protocol.",
            Padding = new Padding(0, 8, 0, 0)
        };

        root.Controls.Add(footer, 0, 5);

        AcceptButton = _scanButton;
    }

    private void BuildGraphicsGroup()
    {
        _graphicsGroup.Text = "Client graphics / resolution (Direct3D 12)";
        _graphicsGroup.Dock = DockStyle.Top;
        _graphicsGroup.AutoSize = true;
        _graphicsGroup.Padding = new Padding(12);

        var table = new TableLayoutPanel
        {
            Dock = DockStyle.Top,
            AutoSize = true,
            ColumnCount = 4,
            RowCount = 3
        };

        table.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 130F));
        table.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));
        table.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 130F));
        table.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));

        _resolutionPreset.DropDownStyle = ComboBoxStyle.DropDownList;
        _resolutionPreset.Dock = DockStyle.Fill;
        _resolutionPreset.Items.AddRange(
            new object[]
            {
                "Game default",
                "Desktop native",
                "1920 x 1080",
                "2560 x 1440",
                "3440 x 1440",
                "3840 x 2160",
                "5120 x 1440",
                "5120 x 2160",
                "7680 x 4320",
                "Custom"
            });
        _resolutionPreset.SelectedIndexChanged += (_, _) =>
            ApplyResolutionPresetToControls();

        ConfigureNumeric(_customWidth, 640, 16384, 1920);
        ConfigureNumeric(_customHeight, 480, 8640, 1080);

        _refreshRate.DropDownStyle = ComboBoxStyle.DropDownList;
        _refreshRate.Dock = DockStyle.Fill;
        _refreshRate.Items.AddRange(
            new object[]
            {
                "Game / Windows default",
                "60 Hz",
                "75 Hz",
                "100 Hz",
                "120 Hz",
                "144 Hz",
                "165 Hz",
                "240 Hz",
                "360 Hz"
            });

        _antiAliasing.DropDownStyle = ComboBoxStyle.DropDownList;
        _antiAliasing.Dock = DockStyle.Fill;
        _antiAliasing.Items.AddRange(
            new object[]
            {
                "Off (sharpest)",
                "2x MSAA",
                "4x MSAA",
                "8x MSAA",
                "16x MSAA"
            });

        _borderless.Text = "Borderless fullscreen";
        _borderless.AutoSize = true;
        _borderless.Checked = true;

        _vsync.Text = "VSync";
        _vsync.AutoSize = true;
        _vsync.Checked = true;

        _anisotropic.Text = "Anisotropic filtering";
        _anisotropic.AutoSize = true;
        _anisotropic.Checked = true;

        table.Controls.Add(NewLabel("Resolution"), 0, 0);
        table.Controls.Add(_resolutionPreset, 1, 0);
        table.Controls.Add(NewLabel("Refresh rate"), 2, 0);
        table.Controls.Add(_refreshRate, 3, 0);

        var dimensions = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            AutoSize = true,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = false
        };

        dimensions.Controls.Add(_customWidth);
        dimensions.Controls.Add(new Label
        {
            AutoSize = true,
            Text = " x ",
            Padding = new Padding(0, 6, 0, 0)
        });
        dimensions.Controls.Add(_customHeight);

        table.Controls.Add(NewLabel("Render size"), 0, 1);
        table.Controls.Add(dimensions, 1, 1);
        table.Controls.Add(NewLabel("Anti-aliasing"), 2, 1);
        table.Controls.Add(_antiAliasing, 3, 1);

        var checks = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            AutoSize = true,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = true
        };

        checks.Controls.Add(_borderless);
        checks.Controls.Add(_vsync);
        checks.Controls.Add(_anisotropic);

        table.Controls.Add(
            new Label
            {
                AutoSize = true,
                Text = "Quality",
                Anchor = AnchorStyles.Left
            },
            0,
            2);

        table.SetColumnSpan(checks, 3);
        table.Controls.Add(checks, 1, 2);

        _graphicsGroup.Controls.Add(table);
    }

    private static Label NewLabel(string text) =>
        new()
        {
            AutoSize = true,
            Text = text,
            Anchor = AnchorStyles.Left,
            Padding = new Padding(0, 6, 0, 0)
        };

    private static void ConfigureNumeric(
        NumericUpDown control,
        decimal minimum,
        decimal maximum,
        decimal value)
    {
        control.Minimum = minimum;
        control.Maximum = maximum;
        control.Value = value;
        control.Increment = 1;
        control.ThousandsSeparator = true;
        control.Width = 105;
    }

    private static void ConfigureActionButton(
        Button button,
        string text,
        EventHandler handler)
    {
        button.Text = text;
        button.AutoSize = true;
        button.MinimumSize = new Size(150, 36);
        button.Margin = new Padding(0, 0, 10, 0);
        button.Click += handler;
    }

    private static void ConfigureProfileRow(
        TableLayoutPanel table,
        int row,
        RadioButton radio,
        string label,
        TextBox path,
        Action browseAction)
    {
        radio.Text = label;
        radio.AutoSize = true;
        radio.Anchor = AnchorStyles.Left;
        radio.Margin = new Padding(3, 8, 8, 8);

        path.Dock = DockStyle.Fill;
        path.Margin = new Padding(3, 5, 8, 5);

        var browse = new Button
        {
            Text = "Browse Folder...",
            AutoSize = true,
            Dock = DockStyle.Fill,
            Margin = new Padding(3, 4, 3, 4)
        };

        browse.Click += (_, _) => browseAction();

        table.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        table.Controls.Add(radio, 0, row);
        table.Controls.Add(path, 1, row);
        table.Controls.Add(browse, 2, row);
    }

    private void LoadSettingsIntoUi()
    {
        _serverPath.Text = _settings.DfbhdServerPath;
        _dfbhdPath.Text = _settings.DfbhdPath;
        _tsPath.Text = _settings.DfbhdTsPath;

        GraphicsOptions g = _settings.Graphics ?? new GraphicsOptions();

        _resolutionPreset.SelectedItem =
            _resolutionPreset.Items.Contains(g.ResolutionPreset)
                ? g.ResolutionPreset
                : "Desktop native";

        if (_resolutionPreset.SelectedIndex < 0)
            _resolutionPreset.SelectedItem = "Desktop native";

        _customWidth.Value =
            Math.Clamp(
                g.Width > 0 ? g.Width : 1920,
                (int)_customWidth.Minimum,
                (int)_customWidth.Maximum);

        _customHeight.Value =
            Math.Clamp(
                g.Height > 0 ? g.Height : 1080,
                (int)_customHeight.Minimum,
                (int)_customHeight.Maximum);

        _refreshRate.SelectedItem =
            g.RefreshRate > 0
                ? $"{g.RefreshRate} Hz"
                : "Game / Windows default";

        if (_refreshRate.SelectedIndex < 0)
            _refreshRate.SelectedItem = "Game / Windows default";

        _antiAliasing.SelectedItem =
            g.AntiAliasingSamples switch
            {
                2 => "2x MSAA",
                4 => "4x MSAA",
                8 => "8x MSAA",
                16 => "16x MSAA",
                _ => "Off (sharpest)"
            };

        _borderless.Checked = g.BorderlessFullscreen;
        _vsync.Checked = g.VSync;
        _anisotropic.Checked = g.AnisotropicFiltering;

        ApplyResolutionPresetToControls();
    }

    private void ApplyResolutionPresetToControls()
    {
        string preset =
            _resolutionPreset.SelectedItem?.ToString()
            ?? "Desktop native";

        (int width, int height, bool editable) =
            preset switch
            {
                "Game default" => (1920, 1080, false),
                "Desktop native" => GetDesktopResolution(),
                "1920 x 1080" => (1920, 1080, false),
                "2560 x 1440" => (2560, 1440, false),
                "3440 x 1440" => (3440, 1440, false),
                "3840 x 2160" => (3840, 2160, false),
                "5120 x 1440" => (5120, 1440, false),
                "5120 x 2160" => (5120, 2160, false),
                "7680 x 4320" => (7680, 4320, false),
                "Custom" => ((int)_customWidth.Value, (int)_customHeight.Value, true),
                _ => GetDesktopResolution()
            };

        if (preset != "Custom")
        {
            _customWidth.Value =
                Math.Clamp(
                    width,
                    (int)_customWidth.Minimum,
                    (int)_customWidth.Maximum);

            _customHeight.Value =
                Math.Clamp(
                    height,
                    (int)_customHeight.Minimum,
                    (int)_customHeight.Maximum);
        }

        _customWidth.Enabled = editable;
        _customHeight.Enabled = editable;
    }

    private static (int Width, int Height, bool Editable) GetDesktopResolution()
    {
        Rectangle bounds =
            Screen.PrimaryScreen?.Bounds
            ?? new Rectangle(0, 0, 1920, 1080);

        return (bounds.Width, bounds.Height, false);
    }

    private GraphicsOptions CurrentGraphicsOptions()
    {
        string preset =
            _resolutionPreset.SelectedItem?.ToString()
            ?? "Desktop native";

        int refresh =
            ParseLeadingInteger(
                _refreshRate.SelectedItem?.ToString());

        int aa =
            ParseLeadingInteger(
                _antiAliasing.SelectedItem?.ToString());

        var options = new GraphicsOptions
        {
            ResolutionPreset = preset,
            Width = preset == "Game default" ? 0 : (int)_customWidth.Value,
            Height = preset == "Game default" ? 0 : (int)_customHeight.Value,
            RefreshRate = refresh,
            BorderlessFullscreen = _borderless.Checked,
            VSync = _vsync.Checked,
            AnisotropicFiltering = _anisotropic.Checked,
            AntiAliasingSamples = aa is 2 or 4 or 8 or 16 ? aa : 0
        };

        _settings.Graphics = options.Clone();
        SettingsStore.Save(_settings);

        return options;
    }

    private static int ParseLeadingInteger(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return 0;

        string digits =
            new string(
                value
                    .TakeWhile(char.IsDigit)
                    .ToArray());

        return int.TryParse(digits, out int result)
            ? result
            : 0;
    }

    private void UpdateGraphicsEnabledState()
    {
        _graphicsGroup.Enabled =
            SelectedProfile() != UpdateProfile.DfbhdServer;
    }

    private UpdateProfile SelectedProfile()
    {
        if (_serverRadio.Checked)
            return UpdateProfile.DfbhdServer;

        if (_tsRadio.Checked)
            return UpdateProfile.DfbhdTs;

        return UpdateProfile.Dfbhd;
    }

    private TextBox TextBoxFor(UpdateProfile profile) =>
        profile switch
        {
            UpdateProfile.DfbhdServer => _serverPath,
            UpdateProfile.Dfbhd => _dfbhdPath,
            UpdateProfile.DfbhdTs => _tsPath,
            _ => _dfbhdPath
        };

    private string SelectedFolder()
    {
        UpdateProfile profile = SelectedProfile();
        string value = TextBoxFor(profile).Text.Trim();

        SettingsStore.SetPath(
            _settings,
            profile,
            value);

        return value;
    }

    private void BrowseFor(UpdateProfile profile)
    {
        using var dialog = new FolderBrowserDialog
        {
            Description = $"Select the {profile.DisplayName()} folder containing dfbhd.exe",
            UseDescriptionForTitle = true,
            ShowNewFolderButton = false
        };

        string existing = TextBoxFor(profile).Text.Trim();

        if (Directory.Exists(existing))
            dialog.InitialDirectory = existing;

        if (dialog.ShowDialog(this) != DialogResult.OK)
            return;

        TextBoxFor(profile).Text = dialog.SelectedPath;

        SettingsStore.SetPath(
            _settings,
            profile,
            dialog.SelectedPath);

        switch (profile)
        {
            case UpdateProfile.DfbhdServer:
                _serverRadio.Checked = true;
                break;
            case UpdateProfile.Dfbhd:
                _dfbhdRadio.Checked = true;
                break;
            case UpdateProfile.DfbhdTs:
                _tsRadio.Checked = true;
                break;
        }
    }

    private void ScanSelected(object? sender, EventArgs e)
    {
        RunUiOperation(() =>
        {
            UpdateProfile profile = SelectedProfile();
            string folder = SelectedFolder();

            ScanResult scan =
                UpdateEngine.Scan(
                    profile,
                    folder);

            _output.Text = scan.Summary;

            if (profile != UpdateProfile.DfbhdServer)
            {
                GraphicsOptions g = CurrentGraphicsOptions();

                _output.AppendText(
                    Environment.NewLine +
                    Environment.NewLine +
                    $"Selected graphics: Direct3D 12, {g.ResolutionPreset}, " +
                    $"{(g.RefreshRate > 0 ? g.RefreshRate + " Hz" : "default refresh")}, " +
                    $"{(g.BorderlessFullscreen ? "borderless" : "game fullscreen/window mode")}.");
            }

            if (!scan.Success)
            {
                MessageBox.Show(
                    this,
                    scan.Summary,
                    "Scan failed",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning);
            }
        });
    }

    private void InstallSelected(object? sender, EventArgs e)
    {
        RunUiOperation(() =>
        {
            UpdateProfile profile = SelectedProfile();
            string folder = SelectedFolder();

            ScanResult scan =
                UpdateEngine.Scan(
                    profile,
                    folder);

            _output.Text = scan.Summary;

            if (!scan.Success || !scan.Compatible)
            {
                MessageBox.Show(
                    this,
                    scan.Summary,
                    "Installation cannot continue",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning);

                return;
            }

            GraphicsOptions graphics =
                CurrentGraphicsOptions();

            DialogResult answer =
                MessageBox.Show(
                    this,
                    $"Install Devil DFBHD Update {PatchEngine.Version} for {profile.DisplayName()}?" +
                    Environment.NewLine +
                    Environment.NewLine +
                    "The current dfbhd.exe will be backed up first." +
                    (profile == UpdateProfile.DfbhdServer
                        ? ""
                        : Environment.NewLine +
                          $"Graphics: Direct3D 12 / {graphics.ResolutionPreset}"),
                    "Confirm update",
                    MessageBoxButtons.YesNo,
                    MessageBoxIcon.Question,
                    MessageBoxDefaultButton.Button2);

            if (answer != DialogResult.Yes)
                return;

            InstallResult result =
                UpdateEngine.Install(
                    profile,
                    folder,
                    graphics);

            _output.Text = result.Summary;

            MessageBox.Show(
                this,
                result.Summary,
                result.Success ? "Update complete" : "Update failed",
                MessageBoxButtons.OK,
                result.Success ? MessageBoxIcon.Information : MessageBoxIcon.Error);
        });
    }

    private void RestoreSelected(object? sender, EventArgs e)
    {
        RunUiOperation(() =>
        {
            UpdateProfile profile = SelectedProfile();
            string folder = SelectedFolder();

            if (!Directory.Exists(folder))
            {
                MessageBox.Show(
                    this,
                    "Select a valid game folder first.",
                    "Restore",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning);

                return;
            }

            DialogResult answer =
                MessageBox.Show(
                    this,
                    $"Restore the newest {profile.DisplayName()} executable backup and renderer state?",
                    "Confirm restore",
                    MessageBoxButtons.YesNo,
                    MessageBoxIcon.Question,
                    MessageBoxDefaultButton.Button2);

            if (answer != DialogResult.Yes)
                return;

            InstallResult result =
                UpdateEngine.Restore(
                    profile,
                    folder);

            _output.Text = result.Summary;

            MessageBox.Show(
                this,
                result.Summary,
                result.Success ? "Restore complete" : "Restore problem",
                MessageBoxButtons.OK,
                result.Success ? MessageBoxIcon.Information : MessageBoxIcon.Warning);
        });
    }

    private void RunUiOperation(Action action)
    {
        try
        {
            Enabled = false;
            UseWaitCursor = true;
            Cursor = Cursors.WaitCursor;
            Application.DoEvents();

            action();
        }
        catch (Exception ex)
        {
            _output.Text = ex.ToString();

            MessageBox.Show(
                this,
                ex.Message,
                "Devil DFBHD Updater",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
        }
        finally
        {
            Cursor = Cursors.Default;
            UseWaitCursor = false;
            Enabled = true;
        }
    }
}
