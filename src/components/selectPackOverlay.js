const selectPackOverlay ={
    data(){
        return {
            packagePath: '',
            folderSelected: false,
        }
    },
    methods: {
        closeOverlay(){
            this.$emit('close-overlay');
        },
        clickOverlay(event){
            if(event.target.classList.contains('select-pack-overlay')){
                this.closeOverlay();
            }
        },
        addGameFromPackage(){
            this.$emit('add-game-from-package', this.packagePath);
        },
        selectFile(){
            window.electronAPI.openFileDialog(['openDirectory']);
        }
    },
    mounted(){
        window.electronAPI.onFileSelected((event,data) => {
            this.packagePath = data.filePaths[0];
            this.folderSelected = true

        });
    },
    template: `
    <div class="select-pack-overlay" @click="clickOverlay($event)">
        <div class="select-pack-dialog">
            <span>ゲームパックのフォルダパスを入力してください</span>
            <p class="text-input" @click="selectFile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
                <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
                </svg>
                {{packagePath}}
            </p>
            <div class="submit-button-container">
                <button class="submit-btn"  @click="addGameFromPackage" v-bind:disabled="!folderSelected">追加</button>
                <div class="cancel-btn"  @click="closeOverlay">キャンセル</div>
            </div>
        </div>
    </div>
    `,
}