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

    private readonly RichTextBox _output = new();

    private readonly Button _scanButton = new();
    private readonly Button _installButton = new();
    private readonly Button _restoreButton = new();

    public MainForm()
    {
        _settings = SettingsStore.Load();

        Text = "Devilish Services DFBHD Update 1.7.0.0";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(900, 650);
        Size = new Size(1040, 760);
        Font = new Font("Segoe UI", 9F);
        AutoScaleMode = AutoScaleMode.Dpi;

        BuildUi();
        LoadSettingsIntoUi();
    }

    private void BuildUi()
    {
        var root = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            Padding = new Padding(14),
            ColumnCount = 1,
            RowCount = 5
        };

        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));

        Controls.Add(root);

        var heading = new Label
        {
            AutoSize = true,
            Text = "Devil DFBHD Engine / Updater 1.7.0.0",
            Font = new Font(Font.FontFamily, 16F, FontStyle.Bold),
            Margin = new Padding(0, 0, 0, 4)
        };

        var subheading = new Label
        {
            AutoSize = true,
            Text = "Select one installation profile and the folder containing dfbhd.exe.",
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
        profileTable.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 120F));

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

        _dfbhdRadio.Checked = true;

        profileGroup.Controls.Add(profileTable);
        root.Controls.Add(profileGroup, 0, 1);

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

        root.Controls.Add(buttonPanel, 0, 2);

        _output.Dock = DockStyle.Fill;
        _output.ReadOnly = true;
        _output.WordWrap = true;
        _output.BackColor = SystemColors.Window;
        _output.Font = new Font("Consolas", 9F);
        _output.Text =
            "Ready." +
            Environment.NewLine +
            Environment.NewLine +
            "DFBHD Server: engine patches + 125 Hz server scheduler; no graphics wrapper." +
            Environment.NewLine +
            "DFBHD Client: engine patches + NPC replication fix + modern D3D8 compatibility." +
            Environment.NewLine +
            "DFBHDTS: safety mode; generic LAA + modern D3D8 compatibility only.";

        root.Controls.Add(_output, 0, 3);

        var footer = new Label
        {
            Dock = DockStyle.Top,
            AutoSize = true,
            Text =
                "Backups are stored in .devil-dfbhd-backups. " +
                "Unknown engine bytes abort without writing the executable.",
            Padding = new Padding(0, 8, 0, 0)
        };

        root.Controls.Add(footer, 0, 4);

        AcceptButton = _scanButton;
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

            if (!scan.Success)
                MessageBox.Show(
                    this,
                    scan.Summary,
                    "Scan failed",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning);
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

            DialogResult answer =
                MessageBox.Show(
                    this,
                    $"Install Devil DFBHD Update {PatchEngine.Version} for {profile.DisplayName()}?" +
                    Environment.NewLine +
                    Environment.NewLine +
                    "The current dfbhd.exe will be backed up first.",
                    "Confirm update",
                    MessageBoxButtons.YesNo,
                    MessageBoxIcon.Question,
                    MessageBoxDefaultButton.Button2);

            if (answer != DialogResult.Yes)
                return;

            InstallResult result =
                UpdateEngine.Install(
                    profile,
                    folder);

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
