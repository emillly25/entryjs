import { Popup } from '@entrylabs/tool';

class EntryModalHelper {
    popup;
    fetchPopup = (data) => EntryModalHelper.popup.setData({ data: { data } });

    constructor() {
        Entry.addEventListener('openSpriteManager', () => {
            console.log('툴', Popup);
            this.showSpritePopup();
        });
    }

    // async showSpritePopup() {
    //     await this._switchPopup('sprite', {
    //         fetch: (data) => {
    //             databaseManager.findAll(data).then(EntryModalHelper.fetchPopup);
    //         },
    //         search: (data) => {
    //             if (data.searchQuery === '') {
    //                 return;
    //             }
    //             databaseManager.search(data, 'sprite').then((result) => {
    //                 EntryModalHelper.fetchPopup(result);
    //             });
    //         },
    //         submit: async (data) => {
    //             // const newObjects = await IpcRendererHelper.importObjectsFromResource(data.selected);
    //             // newObjects.forEach((item) => {
    //             //     const labeledItem = EntryModalHelper._getLabeledObject(item);
    //             //     const object = {
    //             //         id: Entry.generateHash(),
    //             //         objectType: 'sprite',
    //             //         sprite: labeledItem, // 스프라이트 정보
    //             //     };
    //             //     Entry.container.addObject(object, 0);
    //             // });
    //         },
    //         select: (data) => {
    //             const object = {
    //                 id: Entry.generateHash(),
    //                 objectType: 'sprite',
    //                 sprite: data.item, // 스프라이트 정보
    //             };
    //             Entry.container.addObject(object, 0);
    //         },
    //         draw: () => {
    //             const object = {
    //                 id: Entry.generateHash(),
    //                 objectType: 'sprite',
    //                 sprite: {
    //                     name: `${RendererUtils.getLang(
    //                         'Workspace.new_object'
    //                     )}${Entry.container.getAllObjects().length + 1}`,
    //                     pictures: [
    //                         {
    //                             dimension: {
    //                                 width: 960,
    //                                 height: 540,
    //                             },
    //                             fileurl: `${Entry.mediaFilePath}_1x1.png`,
    //                             name: RendererUtils.getLang('Workspace.new_picture'),
    //                             type: '_system_',
    //                         },
    //                     ],
    //                     sounds: [],
    //                     category: {
    //                         main: 'new',
    //                     },
    //                 },
    //             };
    //             Entry.container.addObject(object, 0);
    //             Entry.playground.changeViewMode('picture');
    //         },
    //         write: (data) => {
    //             let linebreak = true;
    //             if (data.writeType === 'one') {
    //                 linebreak = false;
    //             }
    //             const text = data.text || RendererUtils.getLang('Blocks.TEXT');
    //             const object = {
    //                 id: Entry.generateHash(),
    //                 name: text, //Lang.Workspace.textbox,
    //                 text,
    //                 options: {
    //                     font: data.font,
    //                     bold: false,
    //                     underLine: false,
    //                     italic: false,
    //                     strike: data.effects.through || false,
    //                     colour: data.effects.color || '#000000',
    //                     background: data.effects.backgroundColor || '#ffffff',
    //                     lineBreak: linebreak,
    //                     ...data.effects,
    //                 },
    //                 objectType: 'textBox',
    //                 sprite: { sounds: [], pictures: [] },
    //             };
    //             Entry.container.addObject(object, 0);
    //         },
    //         dummyUploads: async ({ formData, objectData }) => {
    //             const result = [
    //                 await this.uploadItem('picture', formData),
    //                 await this.uploadItem('object', objectData),
    //             ];

    //             result.forEach((uploads) => {
    //                 const _uploads = uploads || [];
    //                 EntryModalHelper.popup.setData({ data: { uploads: _uploads, data: [] } });
    //             });
    //         },
    //         uploads: (data) => {
    //             data.uploads.forEach(function(objectModel) {
    //                 const { sprite, objectType = '' } = objectModel;
    //                 if (sprite || objectType === 'textBox') {
    //                     EntryUtils.addObjectToEntry(objectModel);
    //                 } else {
    //                     EntryUtils.addPictureObjectToEntry(objectModel);
    //                 }
    //             });
    //         },
    //         uploadFail: (data) => {
    //             EntryModalHelper.getAlertModal(
    //                 RendererUtils.getLang(`${data.messageParent}.${data.message}`)
    //             );
    //         },
    //         fail: () => {
    //             EntryModalHelper.getAlertModal(RendererUtils.getLang('Msgs.error_occured'));
    //         },
    //         error: () => {
    //             EntryModalHelper.getAlertModal(RendererUtils.getLang('Msgs.error_occured'));
    //         },
    //     });
    // }

    // async _switchPopup(type, events, data = [], imageBaseUrl = '../../images/hardwares/') {
    //     this.loadPopup(data);
    //     const popup = EntryModalHelper.popup;
    //     if (this.lastOpenedType === type) {
    //         if (data.length === 0) {
    //             const initialData = await databaseManager.findAll({
    //                 sidebar: type === 'sound' ? '사람' : 'entrybot_friends',
    //                 subMenu: 'all',
    //                 type,
    //             });
    //             popup.setData({
    //                 data: { data: initialData },
    //             });
    //         } else {
    //             return popup.show({ type, imageBaseUrl });
    //         }
    //     }
    //     this.lastOpenedType = type;

    //     if (popup.isShow) {
    //         popup.hide();
    //     }

    //     //TODO 돌려쓰기용 함수인데, 만약 돌려쓰기가 안된다면 이 함수를 사용하는 함수에 popup 을 직접 넣고 고정적으로 사용하도록 한다.
    //     popup.removeAllListeners();

    //     Object.entries(events).forEach(([eventName, func]) => {
    //         popup.on(eventName, func);
    //     });

    //     popup.show({ type, imageBaseUrl });
    //     return popup;
    // }

    // loadPopup = (data) => {
    //     if (!EntryModalHelper.popup) {
    //         const targetDiv = document.createElement('div');
    //         targetDiv.className = 'modal';
    //         document.body.appendChild(targetDiv);
    //         EntryModalHelper.popup = new Popup({
    //             container: targetDiv,
    //             isShow: false,
    //             data: {
    //                 data: {
    //                     data,
    //                 },
    //             },
    //             type: 'popup',
    //             theme: 'entry',
    //         });

    //         // entryTool의 modal의 css가 덮어씌워져서, 다시 동적으로 css link를 추가
    //         const modalStyleLink = document.createElement('link');
    //         modalStyleLink.setAttribute(
    //             'href',
    //             '../../../node_modules/@entrylabs/modal/dist/entry/entry-modal.css'
    //         );
    //         modalStyleLink.setAttribute('rel', 'stylesheet');
    //         document.head.appendChild(modalStyleLink);
    //     } else {
    //         EntryModalHelper.popup.setData({ data: { data } });
    //     }
    // };
}

export default EntryModalHelper;
