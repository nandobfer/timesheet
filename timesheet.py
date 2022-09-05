import webview

webview.create_window('Timesheet', 'http://127.0.0.1:5000', text_select=True, resizable=False)

if __name__ == '__main__':
    webview.start(debug=True)