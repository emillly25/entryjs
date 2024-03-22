import _ from 'lodash';
import { Popup } from '@entrylabs/tool';
import databaseManager from './databaseManager';

class EntryModalHelper {
    constructor() {
        const _addEventListener = Entry.addEventListener.bind(Entry);
        _addEventListener('openAIUtilizeBlockManager', () => {
            this.showAIUtilizePopup();
        });

        console.log('이벤트 리스너', _addEventListener);
    }

    async showAIUtilizePopup() {
        const aiblocks = this._getActiveAIUtilizeBlocks();
        console.log('모달 팝업 ai', aiblocks);
        const result = await this._switchPopup(
            'aiUtilize',
            {
                submit: async (data) => {
                    // await this._addAIUtilizeBlocks(data.selected);
                },
                itemoff: ({ data, callback }) => {
                    // const isActive = Entry.aiUtilize.isActive(data.name);
                    // if (!isActive) {
                    //     callback && callback();
                    // } else {
                    //     EntryModalHelper.getAlertModal(
                    //         RendererUtils.getLang('Workspace.deselect_ai_utilize_block_warning')
                    //     );
                    // }
                },
                itemon: ({ callback }) => {
                    // callback && callback();
                },
            },
            aiblocks,
            '../images/aiUtilize/'
        );
        console.log('끝', result);
    }

    async _switchPopup(type, events, data, imageBaseUrl) {
        console.log('스위치 팝업 거쳐서');
        this.loadPopup(data);
        const popup = EntryModalHelper.popup;
        console.log('로드팝업완료', popup);
        if (this.lastOpenedType === type) {
            if (data.length === 0) {
                const initialData = await databaseManager.findAll({
                    sidebar: type === 'sound' ? '사람' : 'entrybot_friends',
                    subMenu: 'all',
                    type,
                });
                popup.setData({
                    data: { data: initialData },
                });
            } else {
                return popup.show({ type, imageBaseUrl, baseUrl: '경로설정' });
            }
        }
        this.lastOpenedType = type;

        if (popup.isShow) {
            popup.hide();
        }

        // //TODO 돌려쓰기용 함수인데, 만약 돌려쓰기가 안된다면 이 함수를 사용하는 함수에 popup 을 직접 넣고 고정적으로 사용하도록 한다.
        popup.removeAllListeners();

        Object.entries(events).forEach(([eventName, func]) => {
            popup.on(eventName, func);
        });
        console.log('스위치 팝업 안 수행중');
        console.log('쇼쇼', popup.show());
        popup.show({ type, imageBaseUrl, baseUrl: './resources' });
        return popup;
    }

    loadPopup(data) {
        console.log('로드팝업');
        if (!EntryModalHelper.popup) {
            console.log('모달 만들기');
            const targetDiv = document.createElement('div');
            targetDiv.className = 'modal';
            document.body.appendChild(targetDiv);

            EntryModalHelper.popup = new Popup({
                container: targetDiv,
                isShow: false,
                data: {
                    data: {
                        data,
                    },
                },
                type: 'popup',
                theme: 'entry',
            });

            // entryTool의 modal의 css가 덮어씌워져서, 다시 동적으로 css link를 추가
            const modalStyleLink = document.createElement('link');
            modalStyleLink.setAttribute('href', '../node_modules/entry-tool/dist/entry-tool.css');
            modalStyleLink.setAttribute('rel', 'stylesheet');
            document.head.appendChild(modalStyleLink);
        } else {
            EntryModalHelper.popup.setData({ data: { data } });
        }
    }

    _getActiveAIUtilizeBlocks() {
        const activated = Entry.aiUtilizeBlocks;

        const aiUtilizeBlocks = _.uniq(_.values(Entry.AI_UTILIZE_BLOCK_LIST)).map((item) => {
            item.active = activated.includes(item.name);
            return item;
        });
        return _.sortBy(aiUtilizeBlocks, (item) => {
            let result = '';
            if (item.title) {
                item.nameByLang = item.title['ko']; //TODO 언어설정 다국어
                result = item.title.ko.toLowerCase();
            }
            return result;
        });

        // const aiUtilizeBlocks = _.uniq(_.values(Entry.AI_UTILIZE_BLOCK_LIST)).map((item) => {
        //     item.active = activated.includes(item.name);
        //     return item;
        // });
        // return _.sortBy(aiUtilizeBlocks, (item) => {
        //     let result = '';
        //     if (item.title) {
        //         item.nameByLang = item.title[RendererUtils.getLangType()];
        //         result = item.title.ko.toLowerCase();
        //     }
        //     return result;
        // });
    }
}

export default EntryModalHelper;
