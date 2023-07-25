game.import("extension", function(lib, game, ui, get, ai, _status) {
    return {
        name: "星耀璨然",
        content: function(config, pack) {
            if (!lib.watersky) lib.watersky = {
                developer: false,
                packs: [],
                func: {},
            };
            lib.watersky.packs.add('radiance');
            if (!lib.watersky.radiance) lib.watersky.radiance = {};

            lib.watersky.func.isPrime = function(num, one) {
                if (typeof num != 'number') return false;
                for (var i = 2; i < num; i++) {
                    if (num % i === 0) return false;
                }
                return num > 1 || one;
            };
            lib.watersky.func.findGCD = function(num1, num2) {
                var t = Math.min(Math.abs(num1), Math.abs(num2));
                for (var i = t; i > 1; i--)
                    if (num1 % i === 0 && num2 % i === 0) return i;
                return 1;
            };
            lib.watersky.func.isSameCard = function(card1, card2) {
                if (get.nature(card1) || get.nature(card2)) {
                    if (get.nature(card1) !== get.nature(card2)) return false
                }
                return (get.suit(card1) === get.suit(card2) && get.number(card1) === get.number(card2) && get.name(card1) === get.name(card2));
            };
            lib.watersky.func.skillActionTag = function(name, tag, cond) {
                if (typeof name !== 'string' || typeof tag !== 'string' || !lib.action_tag || !lib.action_tag.contains(tag)) return -5;
                var info = lib.skill[name];
                if (!info) return -4;
                if (!info.action_tag) return -3;
                if (typeof cond == 'string' && ['in', 'out'].contains(cond) && !info.action_tag[cond]) return -2;
                if (!info.action_tag[tag]) return -1;

                if (typeof info.action_tag[tag] === 'number') {
                    return info.action_tag[tag];
                } else if (typeof info.action_tag[tag] === 'boolean') {
                    return 1;
                } else if (parseInt(info.action_tag[tag])) {
                    return parseInt(info.action_tag[tag]);
                }
                return 0;
            };
            lib.watersky.func.playersActionTag = function(player, tag, cond) {
                if (get.itemtype(player) != 'player') return -6;
                if (!lib.action_tag || !lib.action_tag.contains(tag)) return -5;
                var val = 0;
                var skills = player.getSkills();
                for (var i = 0; i < skills.length; i++) {
                    if (lib.watersky.func.skillActionTag(skills[i], tag, cond) > 0) val += lib.watersky.func.skillActionTag(skills[i], tag, cond);
                }
                return val;
            };

            var style_magic = document.createElement('style');
            style_magic.innerHTML = ".player .identity[data-color='radiance_group_magic'],";
            style_magic.innerHTML += "div[data-nature='radiance_group_magic'],";
            style_magic.innerHTML += "span[data-nature='radiance_group_magic'] {text-shadow: black 0 0 1px,rgba(64, 160, 224, 1) 0 0 2px,rgba(64, 160, 224, 1) 0 0 5px,rgba(64, 160, 224, 1) 0 0 10px,rgba(64, 160, 224, 1) 0 0 10px}";
            style_magic.innerHTML += "div[data-nature='radiance_group_magicm'],";
            style_magic.innerHTML += "span[data-nature='radiance_group_magicm'] {text-shadow: black 0 0 1px,rgba(64, 160, 224, 1) 0 0 2px,rgba(64, 160, 224, 1) 0 0 5px,rgba(64, 160, 224, 1) 0 0 5px,rgba(64, 160, 224, 1) 0 0 5px,black 0 0 1px;}";
            style_magic.innerHTML += "div[data-nature='radiance_group_magicmm'],";
            style_magic.innerHTML += "span[data-nature='radiance_group_magicmm'] {text-shadow: black 0 0 1px,rgba(64, 160, 224, 1) 0 0 2px,rgba(64, 160, 224, 1) 0 0 2px,rgba(64, 160, 224, 1) 0 0 2px,rgba(64, 160, 224, 1) 0 0 2px,black 0 0 1px;}";
            document.head.appendChild(style_magic);
            lib.group.push('radiance_group_magic');
            lib.translate.radiance_group_magic = '法';
            lib.translate.radiance_group_magic2 = '法';
            lib.groupnature.radiance_group_magic = 'radiance_group_magic';

            var style_heng = document.createElement('style');
            style_heng.innerHTML = ".player .identity[data-color='radiance_group_heng'],";
            style_heng.innerHTML += "div[data-nature='radiance_group_heng'],";
            style_heng.innerHTML += "span[data-nature='radiance_group_heng'] {text-shadow: black 0 0 1px,rgba(240, 64, 64, 1) 0 0 2px,rgba(240, 64, 64, 1) 0 0 5px,rgba(240, 64, 64, 1) 0 0 10px,rgba(240, 64, 64, 1) 0 0 10px}";
            style_heng.innerHTML += "div[data-nature='radiance_group_hengm'],";
            style_heng.innerHTML += "span[data-nature='radiance_group_hengm'] {text-shadow: black 0 0 1px,rgba(240, 64, 64, 1) 0 0 2px,rgba(240, 64, 64, 1) 0 0 5px,rgba(240, 64, 64, 1) 0 0 5px,rgba(240, 64, 64, 1) 0 0 5px,black 0 0 1px;}";
            style_heng.innerHTML += "div[data-nature='radiance_group_hengmm'],";
            style_heng.innerHTML += "span[data-nature='radiance_group_hengmm'] {text-shadow: black 0 0 1px,rgba(240, 64, 64, 1) 0 0 2px,rgba(240, 64, 64, 1) 0 0 2px,rgba(240, 64, 64, 1) 0 0 2px,rgba(240, 64, 64, 1) 0 0 2px,black 0 0 1px;}";
            document.head.appendChild(style_heng);
            lib.group.push('radiance_group_heng');
            lib.translate.radiance_group_heng = '衡';
            lib.translate.radiance_group_heng2 = '衡';
            lib.groupnature.radiance_group_heng = 'radiance_group_heng';

            var style_union = document.createElement('style');
            style_union.innerHTML = ".player .identity[data-color='radiance_group_union'],";
            style_union.innerHTML += "div[data-nature='radiance_group_union'],";
            style_union.innerHTML += "span[data-nature='radiance_group_union'] {text-shadow: black 0 0 1px,rgba(112, 255, 112, 1) 0 0 2px,rgba(112, 255, 112, 1) 0 0 5px,rgba(112, 255, 112, 1) 0 0 10px,rgba(112, 255, 112, 1) 0 0 10px}";
            style_union.innerHTML += "div[data-nature='radiance_group_unionm'],";
            style_union.innerHTML += "span[data-nature='radiance_group_unionm'] {text-shadow: black 0 0 1px,rgba(112, 255, 112, 1) 0 0 2px,rgba(112, 255, 112, 1) 0 0 5px,rgba(112, 255, 112, 1) 0 0 5px,rgba(112, 255, 112, 1) 0 0 5px,black 0 0 1px;}";
            style_union.innerHTML += "div[data-nature='radiance_group_unionmm'],";
            style_union.innerHTML += "span[data-nature='radiance_group_unionmm'] {text-shadow: black 0 0 1px,rgba(112, 255, 112, 1) 0 0 2px,rgba(112, 255, 112, 1) 0 0 2px,rgba(112, 255, 112, 1) 0 0 2px,rgba(112, 255, 112, 1) 0 0 2px,black 0 0 1px;}";
            document.head.appendChild(style_union);
            lib.group.push('radiance_group_union');
            lib.translate.radiance_group_union = '联';
            lib.translate.radiance_group_union2 = '联';
            lib.groupnature.radiance_group_union = 'radiance_group_union';

            var style_church = document.createElement('style');
            style_church.innerHTML = ".player .identity[data-color='radiance_group_church'],";
            style_church.innerHTML += "div[data-nature='radiance_group_church'],";
            style_church.innerHTML += "span[data-nature='radiance_group_church'] {text-shadow: black 0 0 1px,rgba(255, 255, 0, 1) 0 0 2px,rgba(255, 255, 0, 1) 0 0 5px,rgba(255, 255, 0, 1) 0 0 10px,rgba(255, 255, 0, 1) 0 0 10px}";
            style_church.innerHTML += "div[data-nature='radiance_group_churchm'],";
            style_church.innerHTML += "span[data-nature='radiance_group_churchm'] {text-shadow: black 0 0 1px,rgba(255, 255, 0, 1) 0 0 2px,rgba(255, 255, 0, 1) 0 0 5px,rgba(255, 255, 0, 1) 0 0 5px,rgba(255, 255, 0, 1) 0 0 5px,black 0 0 1px;}";
            style_church.innerHTML += "div[data-nature='radiance_group_churchmm'],";
            style_church.innerHTML += "span[data-nature='radiance_group_churchmm'] {text-shadow: black 0 0 1px,rgba(255, 255, 0, 1) 0 0 2px,rgba(255, 255, 0, 1) 0 0 2px,rgba(255, 255, 0, 1) 0 0 2px,rgba(255, 255, 0, 1) 0 0 2px,black 0 0 1px;}";
            document.head.appendChild(style_church);
            lib.group.push('radiance_group_church');
            lib.translate.radiance_group_church = '教';
            lib.translate.radiance_group_church2 = '教';
            lib.groupnature.radiance_group_church = 'radiance_group_church';


            var style_heaven = document.createElement('style');
            style_heaven.innerHTML = ".player .identity[data-color='radiance_group_heaven'],";
            style_heaven.innerHTML += "div[data-nature='radiance_group_heaven'],";
            style_heaven.innerHTML += "span[data-nature='radiance_group_heaven'] {text-shadow: black 0 0 1px,rgba(255, 255, 96, 1) 0 0 2px,rgba(255, 255, 96, 1) 0 0 5px,rgba(255, 255, 96, 1) 0 0 10px,rgba(255, 255, 96, 1) 0 0 10px}";
            style_heaven.innerHTML += "div[data-nature='radiance_group_heavenm'],";
            style_heaven.innerHTML += "span[data-nature='radiance_group_heavenm'] {text-shadow: black 0 0 1px,rgba(255, 255, 96, 1) 0 0 2px,rgba(255, 255, 96, 1) 0 0 5px,rgba(255, 255, 96, 1) 0 0 5px,rgba(255, 255, 96, 1) 0 0 5px,black 0 0 1px;}";
            style_heaven.innerHTML += "div[data-nature='radiance_group_heavenmm'],";
            style_heaven.innerHTML += "span[data-nature='radiance_group_heavenmm'] {text-shadow: black 0 0 1px,rgba(255, 255, 96, 1) 0 0 2px,rgba(255, 255, 96, 1) 0 0 2px,rgba(255, 255, 96, 1) 0 0 2px,rgba(255, 255, 96, 1) 0 0 2px,black 0 0 1px;}";
            document.head.appendChild(style_heaven);
            lib.group.push('radiance_group_heaven');
            lib.translate.radiance_group_heaven = '圣';
            lib.translate.radiance_group_heaven2 = '圣';
            lib.groupnature.radiance_group_heaven = 'radiance_group_heaven';

            var style_underworld = document.createElement('style');
            style_underworld.innerHTML = ".player .identity[data-color='radiance_group_underworld'],";
            style_underworld.innerHTML += "div[data-nature='radiance_group_underworld'],";
            style_underworld.innerHTML += "span[data-nature='radiance_group_underworld'] {text-shadow: black 0 0 1px,rgba(208, 0, 208, 1) 0 0 2px,rgba(208, 0, 208, 1) 0 0 5px,rgba(208, 0, 208, 1) 0 0 10px,rgba(208, 0, 208, 1) 0 0 10px}";
            style_underworld.innerHTML += "div[data-nature='radiance_group_underworldm'],";
            style_underworld.innerHTML += "span[data-nature='radiance_group_underworldm'] {text-shadow: black 0 0 1px,rgba(208, 0, 208, 1) 0 0 2px,rgba(208, 0, 208, 1) 0 0 5px,rgba(208, 0, 208, 1) 0 0 5px,rgba(208, 0, 208, 1) 0 0 5px,black 0 0 1px;}";
            style_underworld.innerHTML += "div[data-nature='radiance_group_underworldmm'],";
            style_underworld.innerHTML += "span[data-nature='radiance_group_underworldmm'] {text-shadow: black 0 0 1px,rgba(208, 0, 208, 1) 0 0 2px,rgba(208, 0, 208, 1) 0 0 2px,rgba(208, 0, 208, 1) 0 0 2px,rgba(208, 0, 208, 1) 0 0 2px,black 0 0 1px;}";
            document.head.appendChild(style_underworld);
            lib.group.push('radiance_group_underworld');
            lib.translate.radiance_group_underworld = '冥';
            lib.translate.radiance_group_underworld2 = '冥';
            lib.groupnature.radiance_group_underworld = 'radiance_group_underworld';

            var style_free = document.createElement('style');
            style_free.innerHTML = ".player .identity[data-color='radiance_group_free'],";
            style_free.innerHTML += "div[data-nature='radiance_group_free'],";
            style_free.innerHTML += "span[data-nature='radiance_group_free'] {text-shadow: black 0 0 1px,rgba(208, 208, 208, 1) 0 0 2px,rgba(208, 208, 208, 1) 0 0 5px,rgba(208, 208, 208, 1) 0 0 10px,rgba(208, 208, 208, 1) 0 0 10px}";
            style_free.innerHTML += "div[data-nature='radiance_group_freem'],";
            style_free.innerHTML += "span[data-nature='radiance_group_freem'] {text-shadow: black 0 0 1px,rgba(208, 208, 208, 1) 0 0 2px,rgba(208, 208, 208, 1) 0 0 5px,rgba(208, 208, 208, 1) 0 0 5px,rgba(208, 208, 208, 1) 0 0 5px,black 0 0 1px;}";
            style_free.innerHTML += "div[data-nature='radiance_group_freemm'],";
            style_free.innerHTML += "span[data-nature='radiance_group_freemm'] {text-shadow: black 0 0 1px,rgba(208, 208, 208, 1) 0 0 2px,rgba(208, 208, 208, 1) 0 0 2px,rgba(208, 208, 208, 1) 0 0 2px,rgba(208, 208, 208, 1) 0 0 2px,black 0 0 1px;}";
            document.head.appendChild(style_free);
            lib.group.push('radiance_group_free');
            lib.translate.radiance_group_free = '散';
            lib.translate.radiance_group_free2 = '散';
            lib.groupnature.radiance_group_free = 'radiance_group_free';


            // 滴炎尘气耀暮
            // Pack
            var radiance_pack = {
                character: {
                    "radiance_ma004_Watersky": ["female", "radiance_group_magic", 3, ["radiance_zhisu", "radiance_guiji"],
                        []
                    ],

                    "radiance_he001_xueli": ["male", "radiance_group_heng", 4, ["radiance_yanzhen", "radiance_hunlie", "radiance_shangwu"],
                        ["zhu"]
                    ],
                    "radiance_he010_xuening": ["male", "radiance_group_heng", 3, ["radiance_shouxun", "radiance_tongguan", "radiance_kuanzhi"],
                        ["zhu"]
                    ],


                    "radiance_un003_yanghua": ["female", "radiance_group_union", 3, ["radiance_longduan", "radiance_suanjin"],
                        []
                    ],
                    "radiance_un004_reine": ["female", "radiance_group_union", 3, ["radiance_kongyin", "radiance_chuilian"],
                        []
                    ],
                    "radiance_un007_huangqiqiao": ["female", "radiance_group_union", 3, ["radiance_xianzhu", "radiance_gongqiao"],
                        []
                    ],

                    "radiance_ch001_agnes": ["female", "radiance_group_church", 3, ["radiance_tuanjie", "radiance_xisheng", "radiance_ganzhao"],
                        ["zhu"]
                    ],
                    "radiance_ch002_kelvin": ["male", "radiance_group_church", 4, ["radiance_chayi", "radiance_biyou"],
                        []
                    ],
                    "radiance_ch003_aurora": ["female", "radiance_group_church", 3, ["radiance_huizhao", "radiance_zhenjie"],
                        []
                    ],
                    "radiance_ch004_waterSky": ["female", "radiance_group_church", 3, ["radiance_dianlu", "radiance_dizui"],
                        []
                    ],

                    "radiance_hv001_reine": ["female", "radiance_group_heaven", 3, ["radiance_tianxuan", "radiance_xianyue"],
                        []
                    ],
                    "radiance_hv003_norn": ["female", "radiance_group_heaven", 4, ["radiance_yunming", "radiance_tianze"],
                        []
                    ],

                    "radiance_ud002_agares": ["male", "radiance_group_underworld", 4, ["radiance_siqi", "radiance_duanming"],
                        []
                    ],
                    "radiance_ud007_wangruize": ["male", "radiance_group_underworld", 3, ["radiance_yujia", "radiance_jiayi"],
                        []
                    ],

                    "radiance_fr003_rose": ["female", "radiance_group_free", 4, ["radiance_jingji", "radiance_zhanfang"],
                        []
                    ],

                    "radiance_ms001_wawel": ["none", "radiance_group_magic", 8, ["radiance_gongfa", "radiance_baohui"],
                        []
                    ],
                    "radiance_ms002_hydra": ["none", "radiance_group_union", 7, ["radiance_pangran", "radiance_mengdu"],
                        []
                    ],


                    "radiance_000_infinity": ["female", "radiance_group_free", 3, ["radiance_caishe", "radiance_tianshu"],
                        []
                    ],

                },
                characterSort: {
                    "mode_extension_星耀璨然": {
                        "radiance_magic": [
                            "radiance_ma004_Watersky"
                        ],
                        "radiance_heng": [
                            "radiance_he001_xueli",
                        ],
                        "radiance_union": [
                            "radiance_un003_yanghua", "radiance_un004_reine", "radiance_un007_huangqiqiao",
                        ],
                        "radiance_church": [
                            "radiance_ch001_agnes", "radiance_ch002_kelvin", "radiance_ch003_aurora", "radiance_ch004_waterSky",
                        ],
                        "radiance_heaven": [
                            "radiance_hv001_reine", "radiance_hv003_norn",
                        ],
                        "radiance_underworld": [
                            "radiance_ud002_agares", "radiance_ud007_wangruize"
                        ],
                        "radiance_free": [
                            "radiance_fr003_rose", "radiance_ms001_huimiejulong", "radiance_ms002_hydra",
                        ],
                        "radiance_null": [
                            "radiance_000_infinity",
                        ],
                    },
                },
                skill: {},
                translate: {
                    "radiance_magic": "魔法公国希格",
                    "radiance_heng": "大衡帝国",
                    "radiance_union": "赛洛斯联合王国",
                    "radiance_church": "教皇国圣维蒂亚",
                    "radiance_heaven": "上界",
                    "radiance_underworld": "幽冥界",
                    "radiance_free": "自由人",

                    "radiance_ma004_Watersky": "白泽水天",

                    "radiance_he001_xueli": "薛厉",
                    "radiance_he010_xuening": "薛宁",

                    "radiance_un003_yanghua": "杨桦",
                    "radiance_un004_reine": "怜音",
                    "radiance_un007_huangqiqiao": "凰七巧",

                    "radiance_ch001_agnes": "圣雅妮二世",
                    "radiance_ch002_kelvin": "开尔文",
                    "radiance_ch003_aurora": "欧若拉",
                    "radiance_ch004_waterSky": "白泽水天",

                    "radiance_hv001_reine": "怜音",
                    "radiance_hv003_norn": "诺恩",

                    "radiance_ud002_agares": "阿加雷斯",
                    "radiance_ud007_wangruize": "王锐泽",

                    "radiance_fr003_rose": "萝赛",

                    "radiance_ms001_wawel": "瓦维尔",
                    "radiance_ms002_hydra": "海德拉",

                    "radiance_000_infinity": "水天一色",
                },
                characterTitle: {
                    "radiance_ma004_Watersky": "平衡者",

                    "radiance_he001_xueli": "衡太祖",
                    "radiance_he010_xuening": "当朝天子",

                    "radiance_un003_yanghua": "产业龙头",
                    "radiance_un004_reine": "坠天之羽",

                    "radiance_ch001_agnes": "女教宗",
                    "radiance_ch002_kelvin": "圣骑士长",
                    "radiance_ch003_aurora": "晓光骑士",
                    "radiance_ch004_waterSky": "记录者",

                    "radiance_hv001_reine": "悯天使",
                    "radiance_hv003_norn": "命运女神",

                    "radiance_ud002_agares": "恶魔大公",
                    "radiance_ud007_wangruize": "冥灵唤者",

                    
                    "radiance_fr003_rose": "玫瑰女皇",

                    "radiance_ms001_wawel": "炼狱巨龙",
                    "radiance_000_infinity": "阐述者",
                },
                characterReplace: {
                    infinity: ["radiance_ma004_Watersky", "radiance_ch004_waterSky", "radiance_000_infinity"],
                    reine: ["radiance_un004_reine", "radiance_hv001_reine"],
                },
                dynamicTranslate: {
                    "radiance_x": function(player) {
                        if (player.storage.txds_jizhao === true || player.hasSkill('txds_jizhao_active')) {
                            return "出牌阶段对每名其他角色限<span class='bluetext'>两</span>次，你可以将至少一张牌交给其他角色。每回合限<span class='bluetext'>两</span>次，<span class='bluetext'>当你的牌被其他角色获得时</span>，你可以获得一张你选择的基本牌或摸两张牌。（每个牌名和摸牌各只能选择一次）";
                        }
                        return "出牌阶段对每名其他角色限一次，你可以将至少一张牌交给其他角色。每回合限一次，当你本回合有累计两张以上的牌被其他角色获得时，你可以获得一张你选择的基本牌或摸两张牌。";
                    },
                },
            };
            game.addCharacterPack(radiance_pack, "星耀璨然");
        },
        precontent: function() {

        },
        help: {},
        config: {},
        package: {
            character: {
                character: {},
                translate: {},
                characterTitle: {},
            },
            card: {
                card: {},
                translate: {},
                list: [],
            },
            skill: {
                skill: {
                    // general
                    "radiance_losehp1": {
                        trigger: {
                            target: 'useCardToTargeted',
                        },
                        filter: function(event, player) {
                            if (player == event.player) return false;
                            if (player.hp < 1) return false;

                            var card = event.card;
                            if (get.type(card) == 'basic' || get.type(card) == 'trick') return true;
                            return false;
                        },
                        prompt: function(event, player) {
                            return '是否失去一点体力并无效【' + get.translation(event.card) + '】？';
                        },
                        check: function(event, player) {
                            if (event.getParent().excluded.contains(player)) return false;
                            if (get.effect(player, event.card, event.player, player) >= 0) return false;

                            if (get.tag(event.card, 'respondSha')) {
                                if (player.countCards('h', {
                                        name: 'sha'
                                    }) == 0) {
                                    return true;
                                }
                            } else if (get.tag(event.card, 'respondShan')) {
                                if (player.countCards('h', {
                                        name: 'shan'
                                    }) == 0) {
                                    return true;
                                }
                            } else if (get.tag(event.card, 'damage')) {
                                if (player.countCards('h') < 2) return true;
                            }
                            return false;
                        },
                        content: function() {
                            'step 0'
                            player.loseHp(1);
                            'step 1'
                            trigger.getParent().excluded.add(player);
                            game.delay();
                        },
                        ai: {
                            threaten: 0.8,
                        },
                    },
                    "radiance_losehp2": {
                        trigger: {
                            target: 'useCardToTarget',
                        },
                        filter: function(event, player) {
                            if (player == event.player) return false;
                            if (player.hp < 1) return false;

                            var card = event.card;
                            if (get.type(card, 'trick') != 'equip') return true;
                            return false;
                        },
                        prompt: function(event, player) {
                            return '是否失去一点体力并取消【' + get.translation(event.card) + '】？';
                        },
                        check: function(event, player) {
                            if (event.getParent().excluded.contains(player)) return false;
                            if (get.effect(player, event.card, event.player, player) >= 0) return false;

                            if (get.tag(event.card, 'respondSha')) {
                                if (player.countCards('h', {
                                        name: 'sha'
                                    }) == 0) {
                                    return true;
                                }
                            } else if (get.tag(event.card, 'respondShan')) {
                                if (player.countCards('h', {
                                        name: 'shan'
                                    }) == 0) {
                                    return true;
                                }
                            } else if (get.tag(event.card, 'damage')) {
                                if (player.countCards('h') < 2) return true;
                            }
                            return false;
                        },
                        content: function() {
                            'step 0'
                            player.loseHp(1);
                            'step 1'
                            if (!event.isMine()) game.delayx();
                            trigger.getParent().targets.remove(player);
                            trigger.getParent().triggeredTargets2.remove(player);
                            'step 2'
                            game.delay();
                        },
                        ai: {
                            threaten: 0.8,
                        },
                    },
                    "radiance_losehp3": {
                        trigger: {
                            player: "damageBefore",
                        },
                        prompt: function(event, player) {
                            return '是否失去一点体力并取消此伤害？';
                        },
                        frequent: true,
                        content: function() {
                            'step 0'
                            trigger.cancel();
                            'step 1'
                            player.loseHp();
                        },
                        ai: {
                            threaten: 0.6,
                        },
                    },
                    "radiance_forbid": {
                        charlotte: true,
                        forced: true,
                        mark: true,
                        debuff: true,
                        marktext: "禁",
                        mod: {
                            cardEnabled2: function(card) {
                                return false;
                            },
                        },
                        intro: {
                            name: "禁牌",
                            content: "不能使用或打出牌",
                        },
                        ai: {
                            neg: true,
                            forbid_card: true,
                            threaten: 8,
                        },
                    },
                    "radiance_noequip2": {
                        ai: {
                            unequip_ai: true,
                            unequip: true,
                            skillTagFilter: function(player, tag, arg) {
                                if (player.storage.radiance_noequip2) return true;
                                if (arg && arg.name == 'sha') return true;
                                return false;
                            }
                        },
                        locked: true,
                        charlotte: true,
                        onremove: function(player) {
                            if (player.storage.radiance_noequip2) delete player.storage.radiance_noequip2;
                        },
                    },
                    "radiance_wudi": {
                        trigger: {
                            player: 'damageBefore',
                        },
                        mark: true,
                        marktext: "免",
                        forced: true,
                        priority: 65536,
                        content: function() {
                            trigger.cancel();
                        },
                        ai: {
                            nofire: true,
                            nothunder: true,
                            nodamage: true,
                            effect: {
                                target: function(card, player, target, current) {
                                    if (get.tag(card, 'damage')) return [0, 0];
                                }
                            },
                        },
                        intro: {
                            content: "Who's Your Daddy?",
                        },
                    },

                    // magic
                    "radiance_zhisu": {
                        enable: "phaseUse",
                        usable: 1,
                        filter: function(event, player) {
                            if (game.isHonorRadiance === true) {
                                return player.isDamaged();
                            }
                            return true;
                        },
                        content: function() {
                            'step 0'
                            var num = player.getDamagedHp() + 1;
                            var cards = get.cards(num);
                            event.cards = cards;
                            game.cardsGotoOrdering(cards);
                            var dialog = ui.create.dialog("质素");
                            dialog.add("请选择要获得的牌，没获得的点数为1或质数的牌可以造成伤害");
                            dialog.add(cards);
                            player.chooseButton(dialog, [1, cards.length]).set('ai', function(button) {
                                var card = button.link;
                                var damage = 0;
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i] == player) continue;
                                    damage = Math.max(damage, get.damageEffect(game.players[i], player, player));
                                };
                                if (lib.watersky.func.isPrime(get.number(card), true)) {
                                    return player.getUseValue(card) - Math.max(0, damage);
                                };
                                return get.value(card);
                            });
                            'step 1'
                            if (result.bool && result.links.length > 0) {
                                var togain = [];
                                for (var i = 0; i < result.links.length; i++) {
                                    event.cards.remove(result.links[i]);
                                    togain.push(result.links[i]);
                                }
                                player.gain(togain, 'draw');
                            };
                            'step 2'
                            for (var i = 0; i < cards.length; i++) {
                                if (!lib.watersky.func.isPrime(get.number(cards[i]), true)) {
                                    cards.splice(i--, 1);
                                };
                            }
                            if (cards.length > 0) {
                                player.chooseTarget(1, "对一名其他角色造成" + get.cnNumber(cards.length) + "点伤害", lib.filter.notMe).set('ai', function(target) {
                                    var player = _status.event.player;
                                    var eff = get.damageEffect(target, player, player);
                                    if (target.hasSkillTag('nodamage')) return 0;
                                    return eff;
                                });
                            } else {
                                event.finish();
                            }
                            'step 3'
                            if (result.bool) {
                                result.targets[0].damage(player, cards.length, 'nocard');
                            }
                        },
                        ai: {
                            order: 10,
                            result: {
                                player: function(player, target) {
                                    return 1;
                                }
                            },
                            threaten: 0.8,
                        },
                        action_tag: {
                            overall: 4,
                            damage: 0.75,
                            draw: 0.75,
                            deterrence: 1,
                            in: 1,
                        },
                    },
                    "radiance_guiji": {
                        trigger: {
                            target: 'useCardToPlayer',
                        },
                        filter: function(event, player) {
                            if (player == event.player) return false;
                            if (player.hp < 1) return false;

                            if (!game.hasPlayer(function(current) {
                                    return !(event.targets.contains(current));
                                })) return false;

                            var card = event.card;
                            if (get.type(card) != 'equip') return true;
                            return false;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseTarget(get.prompt('radiance_guiji'), '改变' + get.translation(trigger.card) + '的目标', function(card, player, target) {
                                var trigger = _status.event.getTrigger();
                                return !trigger.targets.contains(target);
                            }).set('ai', function(target) {
                                var trigger = _status.event.getTrigger();
                                var card = trigger.card;
                                var player = _status.event.player;
                                var eff1 = get.effect(player, card, trigger.player, player);

                                if (trigger.excluded.contains(player)) return 0;
                                if (eff1 >= 0) return 0;

                                var check = (1 - get.attitude(player, target)) / 10;
                                if (check <= 0) return 0;

                                var eff2 = get.effect(target, card, trigger.player, player);

                                var id = player.playerid;
                                var map = trigger.getParent().customArgs;
                                var need = 1;

                                if (get.tag(card, 'respondSha')) {
                                    if (map[id] && typeof map[id].shaReq == 'number') need = map[id].shaReq;
                                    if (player.countCards('h', {
                                            name: 'sha'
                                        }) < need) {
                                        return Math.max(check, eff2);
                                    }
                                } else if (get.tag(card, 'respondShan')) {
                                    if (map[id] && typeof map[id].shanRequired == 'number') need = map[id].shanRequired;
                                    if (player.countCards('h', {
                                            name: 'shan'
                                        }) < need) {
                                        return Math.max(check, eff2);
                                    }
                                } else if (get.tag(card, 'damage') && get.name(card) != 'huogong') {
                                    return Math.max(check, eff2);
                                } else if (!get.tag(card, 'damage')) {
                                    if (get.name(card) == 'tiesuo' && player.hp > 1) return Math.max(check, eff2);
                                    if (!player.isDamaged) return Math.max(check, eff2);
                                }
                                return 0;
                            });
                            'step 1'
                            if (result.bool) {
                                if (!event.isMine()) game.delayx();
                                event.target = result.targets[0];
                                trigger.getParent().targets.remove(player);
                                trigger.getParent().triggeredTargets1.remove(player);
                                trigger.getParent().targets.add(event.target);
                                trigger.getParent().excluded.add(player);
                                player.line(event.target);
                                player.logSkill('radiance_guiji');
                                game.log(player, "将", trigger.card, "转移给了", event.target);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (trigger.getParent().targets.length > 1 || !get.tag(trigger.card, 'damage')) player.draw(2);
                            'step 3'
                            player.loseHp(1);
                            game.delay(0, 1);
                        },
                        ai: {
                            threaten: 0.6,
                        },
                        action_tag: {
                            overall: 4,
                            loseHp_defend: 1,
                            deterrence: 1,
                        },
                    },

                    // heng
                    "radiance_yanzhen": {
                        trigger: {
                            global: ['respond', 'useCard2'],
                        },
                        filter: function(event, player) {
                            if (!event.respondTo) return false;
                            if (get.name(event.card) != 'wuxie') return false;
                            // if (event.player == player && player == event.respondTo[0]) return false;

                            var cards = [];
                            if (get.itemtype(event.respondTo[1]) == 'card') {
                                cards.push(event.respondTo[1]);
                            }
                            if (get.itemtype(event.respondTo[1]) == 'cards') {
                                cards.addArray(event.respondTo[1]);
                            }
                            if (event.respondTo[1].cards) {
                                cards.addArray(event.respondTo[1].cards);
                            }
                            if (event.player != player) {
                                if (event.cards) {
                                    cards.addArray(event.cards);
                                } else if (event.card) {
                                    cards.add(event.card);
                                }
                            };
                            return cards.filterInD('od').length > 0;
                        },
                        frequent: true,
                        content: function() {
                            'step 0'
                            var cards = [];
                            if (get.itemtype(trigger.respondTo[1]) == 'card') {
                                cards.add(trigger.respondTo[1]);
                            }
                            if (get.itemtype(trigger.respondTo[1]) == 'cards') {
                                cards.addArray(trigger.respondTo[1]);
                            }
                            if (trigger.respondTo[1].cards) {
                                cards.addArray(trigger.respondTo[1].cards);
                            }
                            if (trigger.player != player) {
                                if (trigger.cards) {
                                    cards.addArray(trigger.cards);
                                } else if (trigger.card) {
                                    cards.add(trigger.card);
                                }
                            }
                            cards = cards.filterInD('o');
                            player.gain(cards, 'gain2', 'log');
                        },
                        group: "radiance_yanzhen_wuxie",
                        subSkill: {
                            wuxie: {
                                trigger: {
                                    player: 'useCardBegin'
                                },
                                forced: true,
                                firstDo: true,
                                sub: true,
                                silent: true,
                                filter: function(event) {
                                    return get.type(event.card) == 'trick';
                                },
                                content: function() {
                                    trigger.nowuxie = true;
                                },
                            },
                        },
                    },
                    "radiance_hunlie": {
                        unique: true,
                        enable: 'phaseUse',
                        mark: true,
                        skillAnimation: true,
                        limited: true,
                        animationColor: 'orange',
                        intro: {
                            content: 'limited'
                        },
                        marktext: "军",
                        init: function(player) {
                            if (typeof player.storage.radiance_hunlie != 'boolean') player.storage.radiance_hunlie = false;
                        },
                        filter: function(event, player) {
                            if (game.isHonorRadiance === true && !player.isDamaged()) return false;
                            return (!player.storage.radiance_hunlie);
                        },
                        content: function() {
                            'step 0'
                            player.awakenSkill('radiance_hunlie');
                            'step 1'
                            var num = 1 + Math.max(2, player.getDamagedHp());
                            if (game.isHonorRadiance === true) num = player.getDamagedHp();
                            player.addMark('radiance_junhun', num);
                            player.draw(num);
                        },
                        ai: {
                            order: function(item, player) {
                                if (player.hp < 2) return 99;
                                if (player.hp == 2 && player.countCards('h') <= 2) return 8;
                                return 4;
                            },
                            result: {
                                player: function(player) {
                                    if (player.getDamagedHp() > 2) return 10;
                                    if (player.hp <= 2 && player.countCards('h') <= 2) return 10;
                                    return 0;
                                }
                            },
                        },
                        global: ['radiance_junhun_sha', 'radiance_junhun_damage'],
                        derivation: ['radiance_junhun'],
                    },
                    "radiance_junhun": {
                        intro: {
                            name: "军魂",
                            content: 'mark',
                        },
                        marktext: "军",
                    },
                    "radiance_junhun_sha": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        viewAs: {
                            name: 'sha',
                            isCard: false,
                        },
                        filterCard: function() {
                            return false;
                        },
                        viewAsFilter: function(player) {
                            if (game.isHonorRadiance === true) return false;
                            return player.hasMark('radiance_junhun');
                        },
                        selectCard: -1,
                        precontent: function() {
                            player.removeMark('radiance_junhun', 1);
                        },
                        onuse: function(result, player) {
                            player.logSkill('radiance_junhun_sha');
                        },
                        onrespond: function(result, player) {
                            player.logSkill('radiance_junhun_sha');
                        },
                        prompt: '移除一个“军魂”标记，视为使用或打出一张【杀】',
                        ai: {
                            order: function() {
                                var player = _status.event.player;
                                if (player.hp <= 2 && !game.hasPlayer(function(current) {
                                        return player.canUse('sha', current) && current.hp == 1 && get.effect(current, {
                                            name: 'sha'
                                        }, player, player) > 0;
                                    })) {
                                    return 0;
                                }
                                return 2.95;
                            },
                            skillTagFilter: function(player, tag, arg) {
                                if (!player.hasMark('radiance_junhun') || game.isHonorRadiance === true) return false;
                            },
                            respondSha: true,
                        },
                    },
                    "radiance_junhun_damage": {
                        trigger: {
                            player: ['damageBegin3'],
                        },
                        prompt: '移除一个“军魂”标记，令此伤害-1',
                        filter: function(event, player) {
                            return player.hasMark('radiance_junhun') && event.num > 0;
                        },
                        content: function() {
                            trigger.num--;
                            player.removeMark('radiance_junhun', 1);
                        },
                    },
                    "radiance_shangwu": {
                        trigger: {
                            global: 'damageSource'
                        },
                        filter: function(event, player) {
                            if (player == event.source || !event.source || event.source.group != player.group || !event.notLink()) return false;
                            if (!event.card || get.name(event.card) != 'sha') return false;
                            return player.hasZhuSkill('radiance_shangwu', event.source);
                        },
                        direct: true,
                        zhuSkill: true,
                        content: function() {
                            'step 0'
                            trigger.source.chooseBool('是否令' + get.translation(player) + '发动【尚武】？').set('choice', get.attitude(trigger.source, player) > 1);
                            'step 1'
                            if (result.bool) {
                                trigger.source.logSkill('radiance_shangwu', player);
                                //trigger.source.line(player, 'green')
                                trigger.source.judge(function(card) {
                                    if (get.color(card) == 'red') return 4;
                                    return 0;
                                });
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (result.bool) {
                                player.addMark('radiance_junhun', 1);
                            }
                        },
                        global: ['radiance_junhun_sha', 'radiance_junhun_damage'],
                        derivation: ['radiance_junhun'],
                    },
                    "radiance_shouxun": {
                        enable: 'phaseUse',
                        usable: 1,
                        filter: function(event, player) {
                            return player.countCards('h', 'sha') > 0;
                        },
                        filterTarget: lib.filter.notMe,
                        filterCard: function(card, player) {
                            return get.name(card) == 'sha';
                        },
                        check: function(card) {
                            return 1;
                        },
                        position: 'h',
                        selectCard: [1, 1],
                        discard: false,
                        lose: false,
                        delay: 0,
                        content: function() {
                            'step 0'
                            event.card = cards[0];
                            target.gain(event.card, player, 'give');
                            'step 1'
                            player.draw(2);
                        },
                        ai: {
                            order: function(item, player) {
                                var temp = get.order({
                                    name: 'sha'
                                });
                                if (!temp || temp <= 1) temp = 7;
                                return temp + 1;
                            },
                            result: {
                                target: function(player, target) {
                                    var base = 3;
                                    if (lib.watersky.func.playersActionTag(target, 'demand_sha') > 0) base += 2;
                                    if (target.hasSkillTag('nogain')) base -= 1;
                                    return base / (1 + target.countCards('h', 'sha'));
                                },
                                player: 2,
                            },
                        },
                        action_tag: {
                            overall: 2.5,
                            draw: 2,
                            support_give: 1,
                            in: 1,
                        }
                    },
                    "radiance_tongguan": {
                        trigger: {
                            player: ['phaseJieshuBegin'],
                        },
                        frequent: true,
                        filter: function(event, player, name) {
                            var num = player.getHistory('sourceDamage', function(evt) {
                                return evt.num > 0 && evt.card && get.name(evt.card) == 'sha';
                            }).length;
                            return num == 0;
                        },
                        content: function() {
                            'step 0'
                            var num = 5;
                            var cards = get.cards(num);
                            event.cards = cards;
                            player.chooseButton(["统观：请选择一张牌并获得", cards], 1, true).set('ai', function(button) {
                                return get.value(button.link);
                            })
                            'step 1'
                            if (result.bool) {
                                player.gain(result.links, 'draw');
                                event.cards.removeArray(result.links);
                            }
                            'step 2'
                            var att_cur = get.attitude(player, player.getNext()) > 0 ? 1 : -1;
                            var chooseButton = function(online, player, cards) {
                                var event = _status.event;
                                player = player || event.player;
                                cards = cards || event.cards;
                                event.top = [];
                                event.bottom = [];
                                event.status = true;
                                event.dialog = ui.create.dialog('按顺序选择置于牌堆顶的牌（先选择的在上）', cards);
                                for (var i = 0; i < event.dialog.buttons.length; i++) {
                                    event.dialog.buttons[i].classList.add('pointerdiv');
                                }
                                event.switchToAuto = function() {
                                    event._result = 'ai';
                                    event.dialog.close();
                                    event.control.close();
                                    _status.imchoosing = false;
                                };
                                event.control = ui.create.control('ok', 'pileTop', 'pileBottom', function(link) {
                                    var event = _status.event;
                                    if (link == 'ok') {
                                        if (online) {
                                            event._result = {
                                                top: [],
                                                bottom: []
                                            }
                                            for (var i = 0; i < event.top.length; i++) {
                                                event._result.top.push(event.top[i].link);
                                            }
                                            for (var i = 0; i < event.bottom.length; i++) {
                                                event._result.bottom.push(event.bottom[i].link);
                                            }
                                        } else {
                                            var i;
                                            for (i = 0; i < event.top.length; i++) {
                                                ui.cardPile.insertBefore(event.top[i].link, ui.cardPile.firstChild);
                                            }
                                            for (i = 0; i < event.bottom.length; i++) {
                                                ui.cardPile.appendChild(event.bottom[i].link);
                                            }
                                            for (i = 0; i < event.dialog.buttons.length; i++) {
                                                if (event.dialog.buttons[i].classList.contains('glow') == false &&
                                                    event.dialog.buttons[i].classList.contains('target') == false)
                                                    ui.cardPile.appendChild(event.dialog.buttons[i].link);
                                            }
                                            player.popup(get.cnNumber(event.top.length) + '上' + get.cnNumber(event.cards.length - event.top.length) + '下');
                                            game.log(player, '将' + get.cnNumber(event.top.length) + '张牌置于牌堆顶');
                                        }
                                        event.dialog.close();
                                        event.control.close();
                                        game.resume();
                                        _status.imchoosing = false;
                                    } else if (link == 'pileTop') {
                                        event.status = true;
                                        event.dialog.content.childNodes[0].innerHTML = '按顺序选择置于牌堆顶的牌';
                                    } else {
                                        event.status = false;
                                        event.dialog.content.childNodes[0].innerHTML = '按顺序选择置于牌堆底的牌';
                                    }
                                });
                                for (var i = 0; i < event.dialog.buttons.length; i++) {
                                    event.dialog.buttons[i].classList.add('selectable');
                                }
                                event.custom.replace.button = function(link) {
                                    var event = _status.event;
                                    if (link.classList.contains('target')) {
                                        link.classList.remove('target');
                                        event.top.remove(link);
                                    } else if (link.classList.contains('glow')) {
                                        link.classList.remove('glow');
                                        event.bottom.remove(link);
                                    } else if (event.status) {
                                        link.classList.add('target');
                                        event.top.unshift(link);
                                    } else {
                                        link.classList.add('glow');
                                        event.bottom.push(link);
                                    }
                                };
                                event.custom.replace.window = function() {
                                    for (var i = 0; i < _status.event.dialog.buttons.length; i++) {
                                        _status.event.dialog.buttons[i].classList.remove('target');
                                        _status.event.dialog.buttons[i].classList.remove('glow');
                                        _status.event.top.length = 0;
                                        _status.event.bottom.length = 0;
                                    }
                                };
                                game.pause();
                                game.countChoose();
                            };
                            event.switchToAuto = function() {
                                _status.imchoosing = false;
                                if (event.dialog) event.dialog.close();
                                if (event.control) event.control.close();
                                var top = [];
                                var judges = player.getNext().getCards('j');
                                var stopped = false;
                                if (att_cur < 0) {
                                    for (var i = 0; i < judges.length; i++) {
                                        var judge = get.judge(judges[i]);
                                        cards.sort(function(a, b) {
                                            return judge(a) - judge(b);
                                        });
                                        if (judge(cards[0]) > 0) {
                                            stopped = true;
                                            break;
                                        } else {
                                            top.unshift(cards.shift());
                                        }
                                    }
                                } else if (!player.hasWuxie()) {
                                    for (var i = 0; i < judges.length; i++) {
                                        var judge = get.judge(judges[i]);
                                        cards.sort(function(a, b) {
                                            return judge(b) - judge(a);
                                        });
                                        if (judge(cards[0]) < 0) {
                                            stopped = true;
                                            break;
                                        } else {
                                            top.unshift(cards.shift());
                                        }
                                    }
                                }
                                var bottom;
                                if (!stopped) {
                                    cards.sort(function(a, b) {
                                        return att_cur * (get.value(b, player) - get.value(a, player));
                                    });
                                    while (cards.length) {
                                        if (att_cur > 0 && get.value(cards[0], player) <= 5) break;
                                        if (att_cur < 0 && get.value(cards[0], player) > 4) break;
                                        top.unshift(cards.shift());
                                    }
                                }
                                bottom = cards;
                                for (var i = 0; i < top.length; i++) {
                                    ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
                                }
                                for (i = 0; i < bottom.length; i++) {
                                    ui.cardPile.appendChild(bottom[i]);
                                }
                                player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
                                game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
                                game.delay(2);
                            };

                            if (event.isMine()) {
                                chooseButton();
                                event.finish();
                            } else if (event.isOnline()) {
                                event.player.send(chooseButton, true, event.player, event.cards);
                                event.player.wait();
                                game.pause();
                            } else {
                                event.switchToAuto();
                                event.finish();
                            }
                            'step 3'
                            if (event.result == 'ai' || !event.result) {
                                event.switchToAuto();
                            } else {
                                var top = event.result.top || [];
                                var bottom = event.result.bottom || [];
                                for (var i = 0; i < top.length; i++) {
                                    ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
                                }
                                for (i = 0; i < bottom.length; i++) {
                                    ui.cardPile.appendChild(bottom[i]);
                                }
                                for (i = 0; i < event.cards.length; i++) {
                                    if (!top.contains(event.cards[i]) && !bottom.contains(event.cards[i])) {
                                        ui.cardPile.appendChild(event.cards[i]);
                                    }
                                }
                                player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(event.cards.length - top.length) + '下');
                                game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
                                game.updateRoundNumber();
                                game.delay(2);
                            }
                        },
                    },
                    "radiance_kuanzhi": {
                        trigger: {
                            global: 'shaMiss'
                        },
                        filter: function(event, player) {
                            if (player == event.player || event.player.group != player.group) return false;
                            return player.hasZhuSkill('radiance_kuanzhi', event.player);
                        },
                        direct: true,
                        zhuSkill: true,
                        content: function() {
                            'step 0'
                            trigger.player.chooseBool('是否令' + get.translation(player) + '发动【宽治】？').set('choice', get.attitude(trigger.player, player) > 1);
                            'step 1'
                            if (result.bool) {
                                trigger.player.logSkill('radiance_kuanzhi', player);
                                player.addMark('radiance_junhun', 1);
                            } else {
                                event.finish();
                            }
                        },
                        global: ['radiance_junhun_sha', 'radiance_junhun_damage'],
                        derivation: 'radiance_junhun',
                    },


                    // union
                    "radiance_longduan": {
                        trigger: {
                            player: "phaseDrawBegin1",
                        },
                        filter: function(event, player) {
                            if (event.numFixed) return false;
                            return game.hasPlayer(function(current) {
                                return current != player && current.countCards('h');
                            });
                        },
                        check: function(event, player) {
                            var enemies = game.countPlayer(function(current) {
                                if (current.countCards('h') > 0 && current != player && get.attitude(player, current) <= 0) {
                                    return true;
                                }
                                return false;
                            });
                            var friends = game.countPlayer(function(current) {
                                if (current.countCards('h') == 1 && current != player && get.attitude(player, current) > 1) {
                                    return true;
                                }
                                return false;
                            });
                            return enemies * 2 - friends * 0.5 - player.hp >= 2;
                        },
                        content: function() {
                            'step 0'
                            var targets = game.filterPlayer(function(current) {
                                return current != player && current.countCards('h') > 0;
                            });
                            targets.sort(lib.sort.seat);
                            event.targets = targets;
                            event.num = 0;
                            if (!trigger.numFixed) trigger.num = 0;
                            player.line(targets, 'green');
                            'step 1'
                            if (num < event.targets.length) {
                                if (event.targets[num].countCards('h')) {
                                    player.gainPlayerCard(event.targets[num], 'h', true);
                                }
                                event.num++;
                                event.redo();
                            }
                            'step 2'
                            player.chooseToDiscard('h', player.hp, true);
                        },
                        ai: {
                            threaten: 3,
                        },
                    },
                    "radiance_suanjin": {
                        trigger: {
                            player: 'loseAfter',
                            global: ['equipAfter', 'addJudgeAfter', 'gainAfter'],
                        },
                        forced: true,
                        filter: function(event, player) {
                            var evt = event.getl(player);
                            return evt && evt.player == player && ((evt.hs && evt.hs.length > 0 && player.countCards('h') == 0) || (evt.es && evt.es.length > 0 && player.countCards('e') == 0));
                        },
                        content: function() {
                            if (player.isDamaged()) {
                                player.recover();
                            } else {
                                player.loseHp();
                            }
                        },
                        ai: {
                            threaten: 0.8,
                            noh: true,
                            noe: true,
                            skillTagFilter: function(player, tag) {
                                if (tag == 'noh' || tag == 'noe') {
                                    if (!player.isDamaged()) return false;
                                }
                            }
                        }
                    },
                    "radiance_kongyin": {
                        enable: "phaseUse",
                        usable: 2,
                        filter: function(event, player) {
                            return player.countCards('h') > 0 && (!player.hasSkill('radiance_kongyin_u1') || !player.hasSkill('radiance_kongyin_u2'));
                        },
                        filterTarget: function(card, player, target) {
                            return player != target;
                        },
                        filterCard: function(card, player) {
                            var us = ui.selected.cards;
                            var suit = get.suit(card);
                            for (var i = 0; i < us.length; i++) {
                                if (get.suit(us[i]) == suit) return false;
                            }
                            return true;
                        },
                        selectCard: function() {
                            var player = _status.currentPhase;
                            var num1 = 1,
                                num2 = 4;
                            if (player.hasSkill('radiance_kongyin_u1')) num1 = 2;
                            if (player.hasSkill('radiance_kongyin_u2')) num2 = 1;
                            if (num1 > num2) return 99;
                            return [num1, num2];
                        },
                        complexCard: true,
                        position: 'h',
                        discard: false,
                        lose: false,
                        delay: 0,
                        check: function(card) {
                            if (!ui.selected.cards.length) return 5.1 - get.value(card);
                            var player = _status.currentPhase;
                            if (!player.hasSkill('radiance_kongyin_u1')) return 0;
                            if (ui.selected.cards.length >= 2) return 3.5 - get.value(card);
                            return 5 - get.value(card);
                        },
                        content: function() {
                            'step 0'
                            event.num = cards.length;
                            if (event.num > 1) {
                                player.addTempSkill('radiance_kongyin_u2', 'phaseUseEnd');
                                player.discard(cards);
                            } else {
                                player.addTempSkill('radiance_kongyin_u1', 'phaseUseEnd');
                                target.gain(cards, player, 'giveAuto');
                            }
                            'step 1'
                            if (event.num > 1) {
                                if (event.num < 4) target.draw(4 - event.num, player);
                                target.turnOver();
                            } else {
                                target.loseHp();
                            }
                        },
                        ai: {
                            order: 3.9,
                            result: {
                                target: function(player, target) {
                                    var cs = ui.selected.cards.length;
                                    if (cs >= 2) {
                                        if (target.hasSkillTag('noturn')) return 0;
                                        if (target.isTurnedOver()) return 10;
                                        return -10;
                                    } else {
                                        if (target.hasSkillTag('maihp')) return 2;
                                        if (target.hp <= 1) return -10;
                                        if (player.needsToDiscard() > 0) return -10;
                                    }
                                    return 0;
                                },
                            },
                        },
                        subSkill: {
                            u1: {
                                charlotte: true,
                            },
                            u2: {
                                charlotte: true,
                            },
                        },
                    },
                    "radiance_chuilian": {
                        trigger: {
                            global: ["damageEnd"],
                        },
                        frequent: true,
                        filter: function(event, player) {
                            return event.radiance_chuilian && event.num > 0;
                        },
                        content: function() {
                            player.draw(1);
                        },
                        global: 'radiance_chuilian_mark',
                        subSkill: {
                            mark: {
                                trigger: {
                                    player: 'damageBefore'
                                },
                                forced: true,
                                silent: true,
                                popup: false,
                                sub: true,
                                filter: function(event, player) {
                                    return !event.player.isDamaged() && event.num > 0;
                                },
                                content: function() {
                                    trigger.radiance_chuilian = true;
                                }
                            },
                        },
                    },
                    "radiance_xianzhu": {
                        trigger: {
                            player: "phaseDrawBegin1",
                        },
                        filter: function(event, player) {
                            return !event.numFixed;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseTarget(1, get.prompt2('radiance_xianzhu'), function(card, player, target) {
                                return target.countCards('h') < Math.min(5, target.maxHp);
                            }).set('ai', function(target) {
                                var num = Math.min(5, target.maxHp) - target.countCards('h');
                                if (target == player) {
                                    if (num < 2) return 2;
                                    return Math.min(num + 0.2, 4.2);
                                };
                                if (get.attitude(player, target) < 1) return 0;
                                return num > 3 ? num : num + 1.1;
                            });
                            'step 1'
                            if (result.bool && result.targets.length) {
                                trigger.changeToZero();
                                var target = result.targets[0];
                                var num = Math.min(5, target.maxHp) - target.countCards('h');
                                player.logSkill('radiance_xianzhu', target);
                                player.line(target);
                                target.draw(num, player);
                                if (num < 4) player.draw(1);
                            }
                        },
                        ai: {
                            expose: 0.1,
                        },
                    },
                    "radiance_gongqiao": {
                        trigger: {
                            global: 'damageBegin1'
                        },
                        filter: function(event, player) {
                            if (!event.source || !event.num || !event.notLink()) return false;
                            if (event.source == player) return false;
                            if (!event.card || get.name(event.card) != 'sha') return false;
                            return player.countCards('h') > 0;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseCard(1, 'h', '工巧：是否将一张手牌交给' + get.translation(trigger.source) + '？').set('ai', function(card) {
                                var base = 6;
                                if (get.attitude(player, trigger.source) <= 0) base -= 6;
                                if (get.color(card) == 'red' && player.isDamaged()) base += 3.1;
                                if (get.color(card) == 'red' && !player.isDamaged() && trigger.source.needsToDiscard()) base -= 6;
                                if (get.color(card) == 'black' && get.attitude(player, trigger.player) < 0) base += 1.1;
                                if (get.color(card) == 'black' && get.attitude(player, trigger.player) > 1) base -= 9;

                                return base - get.value(card);
                            });
                            'step 1'
                            if (result.bool && result.cards.length) {
                                var card = result.cards[0];
                                player.logSkill('radiance_gongqiao', trigger.source);
                                if (trigger.source != player) trigger.source.gain(card, 'give', player);
                                if (get.color(card) == 'black') {
                                    trigger.num++;
                                } else {
                                    player.recover();
                                }
                            }
                        },
                    },

                    // church
                    "radiance_tuanjie": {
                        enable: 'phaseUse',
                        usable: 1,
                        filterTarget: function(card, player, target) {
                            return true;
                        },
                        selectTarget: -1,
                        content: function() {
                            'step 0'
                            var target2 = target;
                            target2.chooseCardTarget({
                                filterCard: true,
                                filterTarget: function(card, player, target) {
                                    return target != _status.event.target2;
                                },
                                selectCard: 1,
                                ai1: function(card) {
                                    var player = _status.event.target2;
                                    if (_status.event.du) return -get.value(card, player, 'raw');
                                    return 7 - get.value(card, player, 'raw');
                                },
                                ai2: function(target) {
                                    var att = get.attitude(_status.event.target2, target);
                                    if (_status.event.du) return 0.5 - att;
                                    if (att < 0) return 0;
                                    var nh2 = target.countCards('h') + target.hp * 1.5;
                                    var num = Math.sqrt(1 + nh2);
                                    return att / num;
                                },
                                du: target2.hasCard(function(card) {
                                    return get.value(card, player, 'raw') < 0;
                                }),
                                target2: target2,
                                prompt: "将一张手牌交给其他角色，然后摸一张牌",
                            });
                            'step 1'
                            if (result.bool) {
                                target.give(result.cards, result.targets[0]);
                                target.draw();
                            }
                        },
                        ai: {
                            order: 3,
                            result: {
                                player: function(player) {
                                    if (get.mode() == 'identity' && _status.mode != 'purple') {
                                        var zhu = get.zhu(player);
                                        if (zhu && zhu.isZhu && player == zhu && zhu.phaseNumber < 2) return 0;
                                    }
                                    var friends = game.countPlayer(function(current) {
                                        return get.attitude(player, current) > 0;
                                    });
                                    var enemies = game.countPlayer(function(current) {
                                        return get.attitude(player, current) < 0;
                                    });
                                    if (friends < 2) return 0;
                                    return friends - enemies + 0.5;
                                },
                            },
                        },
                        action_tag: {
                            overall: 3,
                            gain: 2,
                            draw: 2,
                        }
                    },
                    "radiance_xisheng": {
                        trigger: {
                            player: 'damageEnd'
                        },
                        direct: true,
                        filter: function(event) {
                            return event.num > 0;
                        },
                        content: function() {
                            'step 0'
                            var dialog = ui.create.dialog("牺牲");
                            dialog.add("令" + (trigger.source ? get.translation(trigger.source) + "摸一张牌，" : "") + (trigger.num > 1 ? "至多" : "") + get.cnNumber(trigger.num) + "名角色摸三张牌");
                            player.chooseTarget([1, trigger.num], dialog, function(card, player, target) {
                                var trigger = _status.event.getTrigger();
                                return trigger.source != target;
                            }).set('ai', function(target) {
                                var att = get.attitude(player, target);
                                return att / (target.hp * 2 + target.countCards('h') + 0.1);
                            });
                            'step 1'
                            if (result.targets.length) {
                                var targets = result.targets.slice(0);
                                targets = get.sortSeat(targets, trigger.source || _status.currentPhase);
                                player.logSkill('radiance_xisheng', targets);

                                if (trigger.source !== undefined && trigger.source.isIn()) {
                                    trigger.source.draw(1, player);
                                }
                                for (var i = 0; i < targets.length; i++) {
                                    targets[i].draw(3, player);
                                }
                            } else {
                                event.finish();
                            }
                            'step 2'
                            game.delay();
                        },
                        ai: {
                            maixie: true,
                            maixie_hp: true,
                            skillTagFilter: function(player, tag) {
                                if (tag == 'maixie' || tag == 'maixie_hp') {
                                    if (player.hp < 3) return false;
                                }
                            },
                        },
                    },
                    "radiance_ganzhao": {
                        unique: true,
                        zhuSkill: true,
                        trigger: {
                            player: 'phaseDiscardBefore'
                        },
                        filter: function(event, player) {
                            if (!player.hasZhuSkill('radiance_ganzhao')) return false;
                            if (player.needsToDiscard() < 1) return false;
                            return game.hasPlayer(function(current) {
                                return current != player && current.group == player.group;
                            });
                        },
                        check: function() {
                            return true;
                        },
                        content: function() {
                            'step 0'
                            if (event.current === undefined) event.current = player.next;
                            if (event.current == player) {
                                event.finish();
                            } else if (event.current.group == player.group && event.current.countCards('h') > 0) {
                                event.current.chooseToDiscard('是否弃置一张手牌令' + get.translation(player) + '的弃牌阶段跳过？').set('ai', function(card) {
                                    if (get.attitude(event.current, player) < 0) return 0;
                                    return 5 - get.value(card);
                                });
                            }
                            'step 1'
                            if (result.bool) {
                                event.current.line(player, 'green');
                                game.log(event.current, "响应了", 'radiance_ganzhao');
                                trigger.cancel();
                                event.current.addExpose(0.5);
                                event.finish();
                            } else {
                                event.current = event.current.getNext();
                                event.goto(0);
                            }
                        },
                    },

                    "radiance_dianlu": {
                        trigger: {
                            global: ['useCard', 'respond'],
                        },
                        filter: function(event, player) {
                            return event.card.name == 'shan' && (player.inRange(event.player) || event.player == player);
                        },
                        frequent: true,
                        content: function() {
                            player.draw();
                        }
                    },
                    "radiance_dizui": {
                        trigger: {
                            player: 'loseAfter',
                            global: ['equipAfter', 'addJudgeAfter', 'gainAfter'],
                        },
                        filter: function(event, player) {
                            if (player == _status.currentPhase) return false;
                            if (event.name == 'gain' && event.player == player) return false;
                            var evt = event.getl(player);
                            return evt && evt.cards2 && evt.cards2.length > 0;
                        },
                        direct: true,
                        locked: false,
                        content: function() {
                            'step 0'
                            player.chooseTarget(1, '选择【涤罪】的目标', function(card, player, target) {
                                return target != player && get.distance(player, target) <= 1;
                            }).set('ai', function(target) {
                                var base = 1;
                                if (target.hasSkillTag('nodamage')) {
                                    base *= 0.8;
                                }
                                if (target.hasSkill('baiban') || target.hasSkill('fengyin') || target.hasSkillTag('forbid_card')) base *= 0.8;
                                return base * -get.attitude(player, target);
                            });
                            'step 1'
                            if (result.bool && result.targets.length) {
                                event.target = result.targets[0];
                                player.logSkill('radiance_dizui', event.target);
                                player.line(event.target, 'red');
                                if (!player.storage.radiance_dizui) {
                                    player.storage.radiance_dizui = 1;
                                } else {
                                    player.storage.radiance_dizui++;
                                }
                            } else {
                                event.finish();
                            }
                            'step 2'
                            event.target.addTempSkill('baiban');
                            event.target.chooseToRespond({
                                name: 'shan'
                            }).set('autochoose', lib.filter.autoRespondShan);
                            'step 3'
                            if (!result.bool && !event.target.hasSkillTag('forbid_card')) {
                                if (player.storage.radiance_dizui > 1) event.target.addTempSkill('radiance_forbid');
                            } else {
                                event.finish();
                            }
                            'step 4'
                            var next;
                            var evt = event.getParent('dying', true);
                            if (evt) {
                                next = game.createEvent('damage', true, evt.getParent());
                            } else {
                                next = game.createEvent('damage');
                            }
                            next.player = event.target;
                            next.nocard = true;
                            next.source = player;
                            next.nature = 'thunder';
                            next.num = 1;
                            next.setContent('damage');
                            next.filterStop = function() {
                                if (this.source && this.source.isDead()) delete this.source;
                                if (this.num <= 0) {
                                    delete this.filterStop;
                                    this.trigger('damageZero');
                                    this.finish();
                                    this._triggered = null;
                                    return true;
                                }
                            };
                        },
                        ai: {
                            effect: {
                                target: function(card, player, target, current) {
                                    if (!target.hasFriend() && !player.hasUnknown()) return;
                                    if (!game.hasPlayer(function(targetx) {
                                            return get.attitude(player, targetx) < 0 && get.distance(player, target) <= 1;
                                        })) return;

                                    if (_status.currentPhase == target) return;
                                    if (card.name != 'shuiyanqijunx' && get.tag(card, 'loseCard') && target.countCards('he')) {
                                        return [0.7, 1];
                                    }
                                    if (get.tag(card, 'respondSha') || get.tag(card, 'respondShan')) {
                                        if (get.attitude(player, target) > 0 && card.name == 'juedou') return;
                                        if (get.tag(card, 'damage') && target.hasSkillTag('maixie')) return;
                                        if (target.countCards('h') == 0) return [2, -2];

                                        if (get.mode() == 'guozhan') return 0.5;
                                        return [0.7, Math.min((target.countCards('he') - 2) / 4, 0.5)];
                                    }
                                }
                            },
                            threaten: function(player, target) {
                                if (target.countCards('h') == 0) return 2;
                                return 0.7;
                            },
                            nodiscard: true,
                            nolose: true,
                            noe: true,
                            noh: true,
                        },
                        mod: {
                            globalFrom: function(from, to, distance) {
                                return distance - from.getDamagedHp();
                            }
                        },
                        group: 'radiance_dizui_clear',
                        subSkill: {
                            clear: {
                                trigger: {
                                    global: 'phaseBegin',
                                },
                                filter: function(event, player, name) {
                                    return player.storage.radiance_dizui;
                                },
                                forced: true,
                                silent: true,
                                popup: false,
                                charlotte: true,
                                content: function() {
                                    player.storage.radiance_dizui = 0;
                                },
                            },
                        },
                    },
                    "radiance_chayi": {
                        trigger: {
                            player: 'phaseDrawBegin1',
                        },
                        filter: function(event, player) {
                            return true; //!event.numFixed;
                        },
                        check: function(event, player) {
                            var friends = game.countPlayer(function(current) {
                                return get.attitude(player, current) > 0;
                            });
                            var enemies = game.countPlayer(function(current) {
                                return get.attitude(player, current) < 0;
                            });
                            var neutral = game.countPlayer(function(current) {
                                return get.attitude(player, current) == 0;
                            });

                            return friends + neutral * 0.6 + enemies * 0.3 + 0.1 >= event.num;
                        },
                        content: function() {
                            'step 0'
                            event.current = player.next;
                            event.suits = [];
                            event.cards = [];
                            'step 1'
                            player.line(event.current, 'green');
                            event.current.draw();
                            var str = "察异：请弃置一张手牌" + (event.suits.length > 0 ? "（当前已有花色：" + get.translation(event.suits) + "）" : "");
                            event.current.chooseToDiscard('h', 1, true).set('ai', function(card) {
                                var att = get.attitude(_status.event.player, player);
                                var base = 7;
                                var suits = _status.event.getParent().suits;

                                if (att > 1 && !suits.contains(get.suit(card))) {
                                    base += 3;
                                }
                                if (att < 0 && suits.contains(get.suit(card))) {
                                    base -= 2;
                                }
                                return base - get.value(card);
                            }).set('prompt', str);
                            'step 2'
                            if (result.cards && result.cards.length) {
                                event.suits.add(get.suit(result.cards[0]));
                                event.cards.add(result.cards[0]);
                            }
                            if (event.current != player) {
                                event.current = event.current.getNext();
                                game.delay(0.5);
                                event.goto(1);
                            }
                            'step 3'
                            if (event.suits.length == 0) {
                                event.finish();
                            } else {
                                var cards = event.cards.filterInD('cod');
                                var dialog = ui.create.dialog("察异");
                                dialog.add("获得" + get.cnNumber(event.suits.length) + "张牌，或放弃且此阶段改为摸" + get.cnNumber(event.suits.length) + "张牌");
                                dialog.add(cards);

                                var num = Math.min(ui.cardPile.childNodes.length, event.suits.length);
                                var val = 0;
                                for (var i = 0; i < num; i++) {
                                    val += get.value(ui.cardPile.childNodes[i]);
                                };
                                player.chooseButton(dialog, event.suits.length).set('ai', function(button) {
                                    var card = button.link;
                                    return get.value(card) - _status.event.average;
                                }).set('average', val / num).set('filterButton', function(button) {
                                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                                        if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) return false;
                                    }
                                    return true;
                                });
                            };
                            'step 4'
                            if (result.bool) {
                                player.gain(result.links, 'gain2');
                            } else if (!trigger.numFixed) {
                                trigger.num = event.suits.length;
                                trigger.numFixed = true;
                            }
                        },
                        action_tag: {
                            overall: 1.5,
                            draw: 1,
                            change: 1,
                        },
                    },
                    "radiance_biyou": {
                        trigger: {
                            player: ['useCardAfter', 'respond'],
                        },
                        filter: function(event, player) {
                            if (player == _status.currentPhase) return false;
                            return true;
                        },
                        forced: true,
                        content: function() {
                            player.addTempSkill('radiance_wudi');
                        },
                        action_tag: {
                            overall: 3,
                            deterrence: 1,
                            damage_prevent: 1,
                        },
                    },
                    "radiance_huizhao": {
                        trigger: {
                            player: 'phaseZhunbeiBegin'
                        },
                        direct: true,
                        popup: false,
                        content: function() {
                            'step 0'
                            var num = (game.isHonorRadiance === true ? 1 : 2);
                            var str1 = "摸牌阶段令所有角色各摸一张牌，且你本阶段额外摸" + get.cnNumber(num) + "张牌";
                            var str2 = "结束阶段摸" + get.cnNumber(num + 1) + "张牌"
                            player.chooseControl(['选项一', '选项二', 'cancel2'], function() {
                                var bool1 = true;
                                if (player.skipList.contains('phaseUse') || player.hasJudge('bingliang')) bool1 = false;
                                if (player.needsToDiscard(4) && player.hasJudge('lebu')) bool1 = false;

                                var friends = game.countPlayer(function(current) {
                                    return get.attitude(player, current) > 0;
                                });
                                var enemies = game.countPlayer(function(current) {
                                    return get.attitude(player, current) < 0;
                                });
                                if (friends - enemies < -1) {
                                    bool1 = false;
                                } else if (friends - enemies > 1) {
                                    bool1 = true;
                                }

                                if (bool1) return '选项一';
                                return '选项二';
                            }).set('prompt', get.prompt("radiance_huizhao")).set('choiceList', [
                                str1,
                                str2,
                            ]);
                            'step 1'
                            if (result.control == '选项一') {
                                player.addTempSkill('radiance_huizhao_draw');
                            } else if (result.control == '选项二') {
                                player.addTempSkill('radiance_huizhao_end');
                            }
                        },
                        subSkill: {
                            draw: {
                                trigger: {
                                    player: 'phaseDrawBegin1'
                                },
                                forced: true,
                                charlotte: true,
                                sub: true,
                                content: function() {
                                    'step 0'
                                    var targets = game.filterPlayer();
                                    targets.sort(lib.sort.seat);
                                    event.targets = targets;
                                    event.num = 0;
                                    var num1 = (game.isHonorRadiance ? 1 : 2);
                                    if (!trigger.numFixed) trigger.num += num1;
                                    player.line(targets, 'green');
                                    'step 1'
                                    if (num < event.targets.length) {
                                        event.targets[num].draw();
                                        event.num++;
                                        event.redo();
                                    }
                                },
                            },
                            end: {
                                trigger: {
                                    player: 'phaseJieshuBegin'
                                },
                                forced: true,
                                charlotte: true,
                                sub: true,
                                content: function() {
                                    var num = (game.isHonorRadiance ? 2 : 3);
                                    player.draw(num);
                                },
                            },
                        },
                    },
                    "radiance_zhenjie": {
                        trigger: {
                            target: "useCardToTargeted",
                        },
                        check: function(event, player) {
                            if (get.attitude(player, event.player) > 1) return 0;
                            return get.effect(player, event.card, event.player, player) < 0;
                        },
                        filter: function(event, player) {
                            if (event.targets.length > 1) return false;
                            return (event.card.name == 'sha' || get.type(event.card) == 'trick') && player.canCompare(event.player);
                        },
                        logTarget: "player",
                        content: function() {
                            'step 0'
                            player.chooseToCompare(trigger.player);
                            'step 1'
                            if (result.bool) {
                                trigger.getParent().excluded.add(player);
                            } else {
                                if (trigger.cards && trigger.cards.filterInD('od').length) player.gain(trigger.cards.filterInD('od'), 'gain2');
                            }
                        },
                    },



                    // heaven
                    "radiance_tianxuan": {
                        trigger: {
                            player: "judgeBefore",
                        },
                        filter: function(event, player) {
                            return (ui.cardPile.childNodes.length > 0);
                        },
                        frequent: true,
                        content: function() {
                            'step 0'
                            var cards = [];
                            var suits = ['spade', 'heart', 'club', 'diamond'];
                            for (var i = 0; i < 4; i++) {
                                var card = get.cardPile(function(cardx) {
                                    return get.suit(cardx) == suits[i];
                                });
                                if (card) cards.push(card);
                            };
                            player.chooseCardButton(1, true, cards, "获得一张牌作为" + (trigger.judgestr || "") + "的判定结果").set('ai', function(button) {
                                var trigger = _status.event.getTrigger();
                                var player = _status.event.player;

                                var result = trigger.judge(button.link);
                                return 1000 * result - get.useful(button.link);
                            });
                            'step 1'
                            if (result.bool && result.links) {
                                event.card = result.links[0];
                                player.gain(event.card, 'gain2');
                                // player.respond(card, 'highlight', 'noOrdering');
                                // player.$throw(event.card, 1000);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            var str = get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定";
                            event.videoId = lib.status.videoId++;
                            event.dialog = ui.create.dialog(str);
                            event.dialog.classList.add('center');
                            event.dialog.videoId = event.videoId;
                            game.addVideo('judge1', player, [get.cardInfo(card), str, event.videoId]);

                            var node;
                            if (game.chess) {
                                node = card.copy('thrown', 'center', ui.arena).animate('start');
                            } else {
                                node = player.$throwordered(card.copy(), true);
                            }
                            node.classList.add('thrownhighlight');
                            ui.arena.classList.add('thrownhighlight');

                            trigger.finish();
                            trigger._triggered = 2;
                            trigger.result = {
                                card: card,
                                judge: trigger.judge(card),
                                node: node,
                                number: get.number(card),
                                suit: get.suit(card),
                                color: get.color(card),
                            };
                            if (trigger.result.judge > 0) {
                                trigger.result.bool = true;
                                trigger.player.popup('洗具');
                            }
                            if (trigger.result.judge < 0) {
                                trigger.result.bool = false;
                                trigger.player.popup('杯具');
                            }
                            game.log(trigger.player, '的判定结果为', card);
                            trigger.direct = true;
                            game.delay(2);
                            'step 3'
                            ui.arena.classList.remove('thrownhighlight');
                            event.dialog.close();
                            game.addVideo('judge2', null, event.videoId);
                            ui.clear();
                            var card = event.card;
                            // trigger.position.appendChild(card);
                            trigger.result.node.delete();
                        },
                        ai: {
                            threaten: 1.5,
                            effect: {
                                target: function(card, player, target, current) {
                                    if (get.name(card) == 'shandian') return 5;
                                    if (get.type(card) == 'delay') return 0;
                                },
                            },
                        },
                    },
                    "radiance_xianyue": {
                        trigger: {
                            player: 'phaseUseBegin',
                        },
                        check: function() {
                            return player.getFriends(true).length > 1 || player.isTurnedOver();
                        },
                        content: function() {
                            'step 0'
                            player.turnOver();
                            player.storage.radiance_xianyue_add = [];
                            player.storage.radiance_xianyue_minus = [];
                            player.addTempSkill('radiance_xianyue_clear', {
                                player: 'phaseBegin',
                            });
                        },
                        group: ['radiance_xianyue_add', 'radiance_xianyue_minus'],
                        subSkill: {
                            add: {
                                trigger: {
                                    global: 'damageBegin1'
                                },
                                filter: function(event, player) {
                                    if (!player.isTurnedOver()) return false;
                                    if (!Array.isArray(player.storage.radiance_xianyue_add)) return false;
                                    if (!event.source || !event.source.isIn() || event.num < 1) return false;
                                    // if (Array.isArray(player.storage.radiance_xianyue_minus) && player.storage.radiance_xianyue_minus.contains(event.source) && event.source != player) return false;
                                    return !player.storage.radiance_xianyue_add.contains(event.source);
                                },
                                check: function(event, player) {
                                    return get.damageEffect(event.player, event.source, player, event.nature) > 0;
                                },
                                logTarget: 'source',
                                prompt2: function(event, player) {
                                    return get.translation(event.source) + "即将对" + get.translation(event.player) + "造成" + event.num + "点伤害，是否令其进行判定？若为黑色此伤害+1，否则你摸牌。";
                                },
                                content: function() {
                                    'step 0'
                                    player.storage.radiance_xianyue_add.add(trigger.source);
                                    'step 1'
                                    trigger.source.judge(function(card) {
                                        if (get.color(card) == 'black') return 1;
                                        return 0;
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        trigger.num++;
                                    } else {
                                        var num = 1;
                                        if (trigger.source == player) num++;
                                        player.draw(num, player);
                                    }
                                },
                            },
                            minus: {
                                trigger: {
                                    global: 'damageBegin3'
                                },
                                filter: function(event, player) {
                                    if (player.isTurnedOver()) return false;
                                    if (!Array.isArray(player.storage.radiance_xianyue_minus)) return false;
                                    if (!event.player || !event.player.isIn() || event.num < 1) return false;
                                    // if (Array.isArray(player.storage.radiance_xianyue_add) && player.storage.radiance_xianyue_add.contains(event.player) && event.player != player) return false;
                                    return !player.storage.radiance_xianyue_minus.contains(event.player);
                                },
                                check: function(event, player) {
                                    return get.damageEffect(event.player, event.source, player, event.nature) < 0 && get.attitude(player, event.player) > 0;
                                },
                                logTarget: 'player',
                                prompt2: function(event, player) {
                                    return get.translation(event.player) + "即将受到" + (event.source ? get.translation(event.source) + "造成的" : "") + event.num + "点伤害，是否令其进行判定？若为红色此伤害+1，否则你摸牌。";
                                },
                                content: function() {
                                    'step 0'
                                    player.storage.radiance_xianyue_minus.add(trigger.player);
                                    'step 1'
                                    trigger.player.judge(function(card) {
                                        if (get.color(card) == 'red') return 1;
                                        return 0;
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        trigger.num--;
                                    } else {
                                        var num = 1;
                                        if (trigger.player == player) num++;
                                        player.draw(num, player);
                                    }
                                },
                            },
                            clear: {
                                mark: true,
                                intro: {
                                    name: "仙乐",
                                    mark: function(dialog, content, player, storage, skill) {
                                        if (player.storage.radiance_xianyue_add && player.storage.radiance_xianyue_add.length > 0) {
                                            dialog.addText("已对下列角色发动过为来源时的效果");
                                            dialog.addSmall(player.storage.radiance_xianyue_add);
                                        }
                                        if (player.storage.radiance_xianyue_minus && player.storage.radiance_xianyue_minus.length > 0) {
                                            dialog.addText("已对下列角色发动过受伤时的效果");
                                            dialog.addSmall(player.storage.radiance_xianyue_minus);
                                        }
                                    },
                                },
                                charlotte: true,
                                onremove: function(player, skill) {
                                    delete player.storage.radiance_xianyue_add;
                                    delete player.storage.radiance_xianyue_minus;
                                },
                            },
                        },
                    },
                    "radiance_yunming": {
                        trigger: {
                            global: "judge",
                        },
                        direct: true,
                        filter: function(event, player) {
                            return player.countCards('h', {
                                color: 'black'
                            }) > 0;
                        },
                        content: function() {
                            'step 0'
                            var str = get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' + get.translation(trigger.player.judging[0]) + '，' + get.prompt('radiance_yunming');
                            player.chooseCard(str, 'h', function(card) {
                                return (get.color(card) == 'black');
                            }).set('ai', function(card) {
                                var trigger = _status.event.getTrigger();
                                var player = _status.event.player;
                                var judging = _status.event.judging;
                                var max = 0;
                                var min = 0;
                                var suits = ['spade', 'heart', 'diamond', 'club'];

                                for (var i = 1; i < 14; i++) {
                                    for (var j = 0; j < 4; j++) {
                                        var card2 = {
                                            number: i,
                                            suit: suits[j],
                                            name: judging.name,
                                        };
                                        max = Math.max(max, trigger.judge(card2));
                                        min = Math.max(min, trigger.judge(card2));
                                    }
                                }

                                var attitude = get.attitude(player, trigger.player);
                                if (attitude > 0) {
                                    if (max > trigger.judge(judging)) return 6 - get.value(card);
                                } else if (attitude < 0) {
                                    if (min < trigger.judge(judging)) return 6 - get.value(card);
                                }
                                return 0;
                            }).set('judging', trigger.player.judging[0]);
                            'step 1'
                            if (result.bool) {
                                player.logSkill('radiance_yunming', trigger.player);
                                player.respond(result.cards, 'highlight', 'radiance_yunming', 'noOrdering');
                            } else {
                                event.finish();
                            }
                            'step 2'
                            var card = trigger.player.judging[0];
                            var judge0 = trigger.judge(card);
                            var judge1 = 0;
                            var choice = '4';
                            var attitude = get.attitude(player, trigger.player);
                            var list = [];
                            event.suitx = ['heart', 'diamond', 'club', 'spade'];
                            event.suitchoice = event.suitx.randomGet();
                            for (var x = 0; x < 4; x++) {
                                for (var i = 1; i < 14; i++) {
                                    list.add(i);
                                    var judge2 = (trigger.judge({
                                        name: get.name(card),
                                        suit: event.suitx[x],
                                        number: i,
                                        nature: get.nature(card),
                                    }) - judge0) * attitude;
                                    if (judge2 > judge1) {
                                        choice = i;
                                        event.suitchoice = event.suitx[x];
                                        judge1 = judge2;
                                    }
                                }
                            }
                            player.chooseControl(list).set('ai', function() {
                                return _status.event.choice;
                            }).set('choice', choice).prompt = "运命：选择一个点数";
                            'step 3'
                            game.log(trigger.player, '判定结果点数为', '#g' + result.control);
                            player.popup(result.control, 'fire');
                            if (!trigger.fixedResult) trigger.fixedResult = {};
                            trigger.fixedResult.number = result.control;
                            'step 4'
                            player.chooseControl(event.suitx).set('ai', function() {
                                return _status.event.choice;
                            }).set('choice', event.suitchoice).prompt = "运命：选择一个花色";
                            'step 5'
                            game.log(trigger.player, '判定结果花色为', '#g' + result.control);
                            player.popup(result.control, 'fire');
                            if (!trigger.fixedResult) trigger.fixedResult = {};
                            trigger.fixedResult.suit = result.control;
                            if (result.control == 'club' || result.control == 'spade') {
                                trigger.fixedResult.color = 'black';
                            } else if (result.control == 'heart' || result.control == 'diamond') {
                                trigger.fixedResult.color = 'red';
                            }
                        },
                        ai: {
                            rejudge: true,
                            tag: {
                                rejudge: 1
                            }
                        },
                    },
                    "radiance_tianze": {
                        enable: "phaseUse",
                        usable: 1,
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        filterCard: function(card, player) {
                            return true;
                        },
                        position: 'h',
                        check: function(card) {
                            return (6 - get.value(card)) / (get.number(card) + 0.5);
                        },
                        content: function() {
                            'step 0'
                            event.num = get.number(cards[0]);
                            event.cardsx = [];
                            event.current = player;
                            event.getNext = function() {
                                if (event.type == -1) return event.current.getPrevious();
                                return event.current.getNext();
                            };
                            player.chooseControl("顺时针（逆序）", "逆时针（顺序）").set('ai', function(event, player) {
                                var targets = game.filterPlayer(function(target) {
                                    return target != player;
                                });
                                targets.sort(lib.sort.seat);
                                for (var i = 0; i <= Math.floor(targets.length / 2); i++) {
                                    if (get.sgn(get.attitude(player, targets[i])) < get.sgn(get.attitude(player, targets[targets.length - i - 1]))) return 0;
                                };
                                return 1;
                            });
                            'step 1'
                            event.type = -1 + result.index * 2;
                            event.current = event.getNext();
                            'step 2'
                            var str = '弃置一张';
                            str += event.num > 0 ? '点数大于' + event.num + '的' : '';
                            str += '手牌'
                            str += event.current == player ? '' : '，不弃置可能会受到伤害。';
                            player.line(event.current);
                            event.current.chooseToDiscard('h', 1, str, function(card) {
                                return get.number(card) > event.num;
                            }).set('ai', function(card) {
                                var event = _status.event.getParent();
                                _status.event.type = event.type;

                                if (event.current.hasSkillTag('nodamage')) return 0;
                                if (get.number(card) <= event.num) return 0;

                                if (event.getNext() == event.player) {
                                    if (get.attitude(event.current, event.player) > 0) return 0;
                                    return 100 - get.value(card);
                                }
                                var num = get.attitude(event.current, event.getNext()) > 0 ? 14 - get.number(card) : get.number(card);
                                return num * num / (Math.max(get.value(card), 0.5));
                            });
                            'step 3'
                            if (result.bool && result.cards.length > 0) {
                                event.current = event.getNext();
                                event.num = get.number(result.cards[0]);
                                event.cardsx.add(result.cards[0]);
                                event.goto(4);
                            } else {
                                event.cardsx = event.cardsx.filterInD('cd');
                                event.goto(5);
                            }
                            'step 4'
                            game.delay(0.9);
                            if (!event.current || event.current == player) {
                                event.finish();
                            } else {
                                event.goto(2);
                            }
                            'step 5'
                            player.chooseControl("伤害", "拿牌", "cancel2").set('ai', function(event, player) {
                                var val = 0;
                                for (var i = 0; i < event.cardsx.length; i++) {
                                    val += player.getUseValue(event.cardsx);
                                };
                                var effect = get.damageEffect(event.current, player, player);
                                if (val > Math.max(effect, 0)) return 1;
                                if (effect > 0) return 0
                                return 2;
                            });
                            'step 6'
                            if (result.index == 0) {
                                event.current.damage(1, player, 'nocard');
                            } else if (result.index == 1 && event.cardsx.length > 0) {
                                player.gain(event.cardsx, 'gain2');
                            }
                        },
                        ai: {
                            order: 13,
                            result: {
                                player: function(player) {
                                    var next = player.next;
                                    var next2 = next.next;
                                    if (next2 == player) return 1;
                                    if (get.attitude(player, next) > 0) {
                                        if (next.countCards('h') <= 1) return -1;
                                        if (get.attitude(player, next2) > 0) return -1;
                                    }
                                    return 1;
                                },
                            },
                        },
                    },


                    // underworld
                    "radiance_siqi": {
                        trigger: {
                            global: ['dyingBegin']
                        },
                        frequent: true,
                        filter: function(event, player) {
                            return event.player.isIn();
                        },
                        content: function() {
                            player.draw();
                        },
                    },
                    "radiance_duanming": {
                        trigger: {
                            player: "phaseUseBegin",
                        },
                        locked: true,
                        direct: true,
                        filter: function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.color(card) == 'black';
                            }) > 0;
                        },
                        content: function() {
                            'step 0'
                            player.chooseToDiscard('he', get.prompt2("radiance_duanming"), 1, function(card) {
                                return get.color(card) == 'black';
                            }).set('ai', function(card) {
                                var player = _status.event.player;
                                var hs = player.getCards('h', function(card2) {
                                    return card2 != card && card2.name !== 'sha';
                                });

                                var count = 0;
                                if (player.hasCard(function(cardx) {
                                        return cardx != card && get.name(card, player) == 'sha' && player.hasUseTarget(card);
                                    }, 'h')) count += 0.5;
                                for (var i = 0; i < hs.length; i++) {
                                    var card2 = hs[i];
                                    if (game.hasPlayer(function(current) {
                                            return current != player && player.canUse(card2, current) && get.effect(current, card2, player, player) > 0;
                                        })) {
                                        count += 1;
                                    }
                                }

                                if (player.needsToDiscard(1 - count) > 0) return 5 - get.value(card);
                                return 0;
                            });
                            'step 1'
                            if (result.bool) {
                                player.logSkill('radiance_duanming');
                                var targets = game.filterPlayer(function(current) {
                                    return current != player;
                                });
                                targets.sort(lib.sort.seat);
                                event.targets = targets;
                                event.num = 0;
                                player.line(targets, 'green');
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (num < event.targets.length) {
                                event.targets[num].addTempSkill('radiance_duanming_db');
                                event.num++;
                                event.redo();
                            }
                        },
                    },
                    "radiance_duanming_db": {
                        trigger: {
                            player: 'gainBefore'
                        },
                        content: function() {
                            trigger.cancel();
                            var cards = trigger.result || trigger.cards;
                            if (cards && cards.length && !get.owner(cards[0])) {
                                player.$throw(cards, 1000);
                                game.cardsDiscard(cards);
                                game.log(player, '将', cards, '置入了弃牌堆');
                                game.delay(0.7);
                            }
                        },
                        charlotte: true,
                        forced: true,
                        marktext: "直",
                        debuff: true,
                        popup: false,
                        mod: {
                            cardEnabled2: function(card, player) {
                                if (player.hp > 0) return false;
                            },
                        },
                        init: function(player, skill) {
                            player.addSkillBlocker(skill);
                        },
                        onremove: function(player, skill) {
                            player.removeSkillBlocker(skill);
                        },
                        skillBlocker: function(skill, player) {
                            return !lib.skill[skill].charlotte;
                        },
                        mark: true,
                        intro: {
                            content: function(storage, player, skill) {
                                var str = "不能使用或打出牌";
                                var list = player.getSkills(null, false, false).filter(function(i) {
                                    return lib.skill.radiance_duanming_db.skillBlocker(i, player);
                                });
                                if (list.length) str += "，以下技能失效：" + get.translation(list);
                                return str;
                            }
                        },
                        ai: {
                            neg: true,
                        },
                    },
                    "radiance_yujia": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        derivation: ['radiance_qinshi'],
                        filter: function(event, player) {
                            if (player.countCards('h') > 0) return true;
                            return false;
                        },
                        marktext: "假",
                        intro: {
                            content: 'mark',
                        },
                        ondisable: true,
                        onremove: function(player) {
                            player.storage.radiance_yujia = 0;
                        },
                        chooseButton: {
                            dialog: function(event, player) {
                                var list = [];
                                for (var i = 0; i < lib.inpile.length; i++) {
                                    var name = lib.inpile[i];
                                    if (name == 'sha') {
                                        list.push(['基本', '', 'sha']);
                                        list.push(['基本', '', 'sha', 'fire']);
                                        list.push(['基本', '', 'sha', 'thunder']);
                                        list.push(['基本', '', 'sha', 'ice']);
                                    } else if (name == 'shan') list.push(['基本', '', name]);
                                    else if (name == 'wuxie') list.push(['锦囊', '', name]);
                                }
                                return ui.create.dialog('驭假', [list, 'vcard']);
                            },
                            filter: function(button, player) {
                                var evt = _status.event.getParent();
                                //if (evt.type == 'wuxie') return true;
                                return evt.filterCard({
                                    name: button.link[2]
                                }, player, evt);
                            },
                            check: function(button) {
                                var player = _status.event.player;
                                if (player.countCards('h', button.link[2]) > 0) return 0;

                                if (button.link[2] == 'shan') return 2;

                                var evt = _status.event.getParent();
                                if (evt && evt.type == 'wuxie') {
                                    return player.countCards('h', function(card) {
                                        return get.value(card, player) < 5;
                                    });
                                } else if (evt && evt.name == 'chooseToRespond') {
                                    return 1;
                                }

                                var effect = player.getUseValue(button.link[2]);
                                if (effect > 0) return effect;
                                return 0;
                            },
                            backup: function(links, player) {
                                return {
                                    filterCard: function(card, player) {
                                        return true;
                                    },
                                    selectCard: 1,
                                    popname: true,
                                    check: function(card) {
                                        return 7.1 - get.value(card);
                                    },
                                    position: 'h',
                                    viewAs: {
                                        name: links[0][2],
                                        nature: links[0][3],
                                        isCard: true,
                                    },
                                    onuse: function(result, player) {
                                        player.logSkill('radiance_yujia');
                                        player.addAdditionalSkill("radiance_qinshi", "radiance_qinshi");
                                        player.addMark('radiance_yujia', 1, true);
                                    },
                                    onrespond: function(result, player) {
                                        player.logSkill('radiance_yujia');
                                        player.addAdditionalSkill("radiance_qinshi", "radiance_qinshi");
                                        player.addMark('radiance_yujia', 1, true);
                                    },
                                }
                            },
                            hiddenCard: function(player, name) {
                                if (player.countCards('h') < 1) return false;
                                return name == 'wuxie';
                            },
                            prompt: function(links, player) {
                                return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用或打出';
                            }
                        },
                        hiddenCard: function(player, name) {
                            if (player.countCards('h') < 1) return false;
                            return name == 'wuxie';
                        },
                        ai: {
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function(player) {
                                if (player.countCards('h') < 1) return false;
                            },
                            order: 4,
                            result: {
                                player: function(player) {
                                    var allshown = true,
                                        players = game.filterPlayer();
                                    for (var i = 0; i < players.length; i++) {
                                        if (players[i].ai.shown == 0) {
                                            allshown = false;
                                        }
                                        if (players[i] != player && players[i].countCards('h') && get.attitude(player, players[i]) > 0) {
                                            return 1;
                                        }
                                    }
                                    if (allshown) return 1;
                                    return 0;
                                }
                            },
                            threaten: 1.9,
                        },
                        action_tag: {
                            overall: 2,
                            sha_viewAs: 1,
                            shan: 1,
                            wuxie: 1,
                            negative: 0.5,
                        }
                    },
                    "radiance_jiayi": {
                        trigger: {
                            player: "damageEnd",
                        },
                        filter: function(event, player) {
                            return event.source && event.source.isIn() && event.source != player && event.num > 0 && player.hasMark('radiance_yujia');
                        },
                        logTarget: "source",
                        check: function(event, player) {
                            return get.attitude(player, event.source) < player.countMark('radiance_yujia');
                        },
                        content: function() {
                            'step 0'
                            var num = Math.min(player.countMark('radiance_yujia'), trigger.num);
                            player.removeMark('radiance_yujia', num);
                            trigger.source.addMark('radiance_yujia', num, true);
                            trigger.source.addAdditionalSkill("radiance_qinshi", "radiance_qinshi");
                            'step 1'
                            if (player.countMark('radiance_yujia') < 1) player.removeAdditionalSkill('radiance_qinshi');
                        },
                        ai: {
                            combo: 'radiance_yujia',
                        },
                        group: 'radiance_jiayi_draw',
                        subSkill: {
                            draw: {
                                trigger: {
                                    player: 'phaseDrawBegin1',
                                },
                                forced: true,
                                filter: function(event, player, name) {
                                    if (event.numFixed) return false;
                                    return game.filterPlayer(function(target) {
                                        return target != player && target.hasMark('radiance_yujia');
                                    }).length > 0;
                                },
                                content: function() {
                                    trigger.num += game.filterPlayer(function(target) {
                                        return target != player && target.hasMark('radiance_yujia');
                                    }).length;
                                },
                            },
                        },
                    },
                    "radiance_qinshi": {
                        trigger: {
                            player: 'phaseJieshuBegin',
                        },
                        filter: function(event, player) {
                            var num = player.hasSkill('radiance_yujia') ? 4 : 2;
                            if (game.countPlayer(function(current) {
                                    return current.hasSkill('radiance_yujia');
                                }) < 1) num = 1;
                            return player.countMark('radiance_yujia') >= num;
                        },
                        forced: true,
                        charlotte: true,
                        content: function() {
                            'step 0'
                            player.removeMark('radiance_yujia', player.countMark('radiance_yujia'), true);
                            player.removeAdditionalSkill('radiance_qinshi');
                            if (player.hasSkill('radiance_yujia')) player.draw(2);
                            'step 1'
                            player.loseHp(1);
                        },
                    },


                    // free
                    "radiance_jingji": {
                        trigger: {
                            global: 'useCardToTargeted'
                        },
                        filter: function(event, player) {
                            return event.card.name == 'sha' && player.hasCard(function(card) {
                                return get.type(card) == 'basic';
                            }, 'h') && event.player.inRange(player) && player != _status.currentPhase;
                        },
                        check: function(event, player) {
                            return get.attitude(player, event.target) >= 1 && get.attitude(player, event.player) <= 0 && player.countCards('h', function(card) {
                                return get.value(card) < (event.target == player ? 8 : 6);
                            });
                        },
                        logTarget: "player",
                        content: function() {
                            'step 0'
                            event.source = trigger.player;
                            player.chooseToRespond('h', "荆棘：请选择要打出的牌", 1, true, function(card) {
                                if (get.position(card) != 'h') return false;
                                return get.type(card) == 'basic';
                            }).set('ai', function(card) {
                                if (trigger.target == player) return 8 - get.value(card);
                                return 6 - get.value(card);
                            });
                            'step 1'
                            if (result.bool && result.cards.length > 0) {
                                event.card = result.cards[0];
                                event.type = 2;
                                switch (get.name(event.card)) {
                                    case 'sha':
                                        {
                                            event.type = 1;
                                            break;
                                        }
                                    case 'shan':
                                        {
                                            event.type = 3;
                                            break;
                                        }
                                    default:
                                        {
                                            event.type = 2;
                                            break;
                                        }
                                };
                                event.source.chooseToRespond({
                                    name: 'shan'
                                }).set('ai', function(card) {
                                    if (get.attitude(_status.currentPhase, _status.event.source < 1)) return 0;
                                    if (_status.event.type == 1 && _status.event.source.hp <= 2) {
                                        return 9 - get.value(card);
                                    } else if (_status.event.type == 3 && _status.event.source.hasCard(function(card2) {
                                            return get.value(card2) > 5.9;
                                        }, 'he')) {
                                        return 7 - get.value(card);
                                    } else if (_status.event.type == 2 && _status.event.cplayer.countCards('h') < 3) {
                                        return 8 - get.value(card);
                                    }
                                    return 0;
                                }).set('autochoose', lib.filter.autoRespondShan).set('source', event.source).set('type', event.type).set('cplayer', player);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (result.bool) {
                                trigger.getParent().excluded.add(trigger.target);
                            } else {
                                if (event.type == 1) {
                                    trigger.player.damage(2, player).set('nature', 'ice');
                                } else if (event.type == 2) {
                                    trigger.target.draw(2, player);
                                    player.draw(2, player);
                                } else {
                                    player.gainPlayerCard(trigger.player, 'he', 1);
                                    var sha = trigger.cards.filterInD('od');
                                    if (sha && sha.length) player.gain(sha, 'gain2');
                                }
                            }
                        },
                        ai: {
                            threaten: 1.1,
                            expose: 0.4,
                        },
                        action_tag: {
                            overall: 3,
                            demand_sha: 2,
                            active_defend: 2,
                        }
                    },
                    "radiance_zhanfang": {
                        unique: true,
                        enable: 'phaseUse',
                        mark: true,
                        skillAnimation: true,
                        limited: true,
                        animationColor: 'key',
                        intro: {
                            content: 'limited'
                        },
                        init: function(player) {
                            if (typeof player.storage.radiance_zhanfang != 'boolean') player.storage.radiance_zhanfang = false;
                        },
                        filter: function(event, player) {
                            return (!player.storage.radiance_zhanfang);
                        },
                        content: function() {
                            'step 0'
                            player.awakenSkill('radiance_zhanfang');
                            'step 1'
                            event.cards = get.cards(5);
                            game.cardsGotoOrdering(event.cards);
                            event.ongoing = true;
                            player.showCards(event.cards);
                            for (var i = 0; i < 5; i++) {
                                if (get.name(event.cards[i]) == 'sha') event.ongoing = false;
                            }
                            'step 2'
                            if (event.ongoing) {
                                var card2 = get.cards(1)[0];
                                event.cards.add(card2);
                                player.showCards(event.cards);
                                game.cardsGotoOrdering(card2);
                                if (get.name(card2) == 'sha') {
                                    event.ongoing = false;
                                } else {
                                    game.delay(1);
                                    event.redo();
                                }
                            }
                            'step 3'
                            player.gain(event.cards, 'gain2');
                            player.storage.radiance_zhanfang_af = event.cards;
                            player.addTempSkill('radiance_zhanfang_af');
                        },
                        ai: {
                            order: function(item, player) {
                                if (player.hp < 2) return 99;
                                if (player.hp == 2 && player.countCards('h') <= 2) return 8;
                                return 4;
                            },
                            result: {
                                player: function(player) {
                                    if (player.hp <= 2 || player.countCards('h') <= 2) return 10;
                                    return 0;
                                }
                            },
                        },
                        action_tag: {
                            overall: 15,
                            limited: 1,
                            draw: 6,
                        },
                    },
                    "radiance_zhanfang_af": {
                        mark: true,
                        intro: {
                            mark: function(dialog, storage, player, skill) {
                                if (!player.storage.radiance_zhanfang_af) return;
                                dialog.add('获得的牌（点击【绽放】按钮查看手牌中剩余的牌）');
                                dialog.addSmall(player.storage.radiance_zhanfang_af);
                                return;
                            },
                        },
                        mod: {
                            targetInRange: function(card, player, target) {
                                if (card.name == 'sha' && target != player) {
                                    return true;
                                }
                            },
                            ignoredHandcard: function(card, player) {
                                if (player.storage.radiance_zhanfang_af && player.storage.radiance_zhanfang_af.contains(card)) {
                                    return true;
                                }
                            },
                            cardDiscardable: function(card, player, name) {
                                if (name == 'phaseDiscard' && player.storage.radiance_zhanfang_af && player.storage.radiance_zhanfang_af.contains(card)) {
                                    return false;
                                }
                            },
                        },
                        onremove: function(player, skill) {
                            delete player.storage.radiance_zhanfang_af;
                        },
                        enable: 'phaseUse',
                        filter: function(event, player) {
                            if (!Array.isArray(player.storage.radiance_zhanfang_af)) return false;
                            return player.countCards('h', function(card) {
                                return player.storage.radiance_zhanfang_af.contains(card);
                            }) > 0;
                        },
                        filterCard: function(card, player) {
                            if (!Array.isArray(player.storage.radiance_zhanfang_af)) return false;
                            return player.storage.radiance_zhanfang_af.contains(card);
                        },
                        prompt: '手牌中剩余的牌',
                        selectCard: 99,
                        discard: false,
                        lose: false,
                        delay: false,
                        pop: false,
                        silent: true,
                        complexSelect: true,
                        complexCard: true,
                        charlotte: true,
                        locked: true,
                        content: function() {
                            game.delay(1);
                        },
                    },

                    "radiance_gongfa": {
                        trigger: {
                            global: 'useCardToTarget'
                        },
                        init: function(player) {
                            player.disableEquip(2);
                        },
                        filter: function(event, player) {
                            if (!event.isFirstTarget) return false;
                            if (get.name(event.card) != 'sha') return false;
                            if (!event.targets || event.player == player) return false;
                            for (var i = 0; i < event.targets.length; i++) {
                                if (event.targets[i] == player) return false;
                            }
                            return event.player.inRange(player);
                        },
                        forced: true,
                        content: function() {
                            'step 0'
                            trigger.targets.add(player);
                            player.draw();
                        },
                    },
                    "radiance_baohui": {
                        trigger: {
                            global: 'useCardAfter',
                        },
                        frequent: true,
                        locked: false,
                        filter: function(event, player) {
                            if (!event.cards || event.cards.filterInD('od').length < 1) return false;
                            return get.name(event.card) == 'sha' && get.suit(event.card) == 'club' && event.targets.contains(player);
                        },
                        content: function() {
                            player.gain(trigger.cards.filterInD('od'), 'gain2');
                        },
                        mod: {
                            cardUsable: function(card, player, num) {
                                if (get.name(card) == 'sha' && get.suit(card) == 'club') return true;
                            },
                            aiOrder: function(player, card, num) {
                                if (get.name(card) == 'sha' && get.suit(card) == 'club') {
                                    return num - 0.1;
                                }
                            },
                        },
                        ai: {
                            effect: {
                                target: function(card, player, target, current) {
                                    if (get.name(card) == 'sha') return 0.5;
                                }
                            }
                        },
                    },
                    "radiance_pangran": {
                        enable: 'phaseUse',
                        filter: function(event, player) {
                            return player.countCards('h', lib.skill.radiance_pangran.filterCard) > 0;
                        },
                        filterCard: function(card, player) {
                            return get.name(card) == 'shan';
                        },
                        check: function(card) {
                            return 1;
                        },
                        position: 'h',
                        selectCard: [1, Infinity],
                        debuff: true,
                        locked: true,
                        content: function() {
                            var num = cards.length;
                            player.draw(num);
                        },
                        mod: {
                            cardEnabled: function(card) {
                                if (card.name == 'shan') return false;
                            },
                            aiValue: function(player, card, num) {
                                if (get.name(card) == 'shan') {
                                    return 0.01;
                                }
                            },
                        },
                        action_tag: {
                            negative: 1,
                            overall: -1,
                            draw: 1,
                        },
                        ai: {
                            neg: true,
                            order: 20,
                            result: {
                                player: 1,
                            },
                        },
                    },
                    "radiance_mengdu": {
                        enable: 'phaseUse',
                        usable: 1,
                        filterTarget: function(card, player, target) {
                            return player != target && target.countCards('h') > 0;
                        },
                        content: function() {
                            'step 0'
                            target.showHandcards();
                            var sha = target.getCards('h', function(card) {
                                return ['sha', 'shan'].contains(card.name);
                            });
                            event.sha = sha;
                            if (sha.length > 0) {
                                target.chooseBool("弃置手牌中所有的【杀】和【闪】，或者不弃置并受到一点伤害").set('ai', function() {
                                    if (_status.event.player.hp == 1 && _status.event.player.countCards('h', function(card) {
                                            return get.tag(card, 'save');
                                        }) < 1 && !_status.event.player.hasSkillTag('save')) {
                                        return true;
                                    }
                                    if (_status.event.player.getDamagedHp() < 2) {
                                        if (lib.watersky.func.playersActionTag(_status.event.player, 'demand_sha') > 0) {
                                            return _status.event.cards.length < 2;
                                        }
                                        return _status.event.cards.length < 3;
                                    }
                                    return _status.event.cards.length - player.hp > 2;
                                }).set('cards', sha);
                            } else {
                                event.finish();
                            }
                            'step 1'
                            if (result.bool) {
                                target.discard(event.sha, player, 'notBySelf');
                            } else {
                                target.damage('nocard');
                            }
                        },
                        ai: {
                            order: 10,
                            result: {
                                target: -1,
                            },
                        },
                    },



                    "radiance_caishe": {
                        mark: true,
                        marktext: "设",
                        intro: {
                            name: '裁设',
                            mark: function(dialog, storage, player, skill) {
                                if (player.storage.radiance_caishe) {
                                    dialog.addAuto([player.storage.radiance_caishe]);
                                    return get.translation(player.additionalSkills.radiance_caishe[0]) + "：" + get.translation(player.additionalSkills.radiance_caishe[0] + '_info');
                                }
                            },
                        },
                        trigger: {
                            player: ['phaseBefore', 'phaseAfter'],
                            global: ['gameStart', 'dieAfter']
                        },
                        filter: function(event, player) {
                            return true;
                        },
                        unique: true,
                        fixed: true,
                        superCharlotte: true,
                        charlotte: true,
                        forced: true,
                        zero: true,
                        filter: function(event, player) {
                            if (event.name == 'die') return (player.storage.radiance_caishe && player.storage.radiance_caishe == event.player);
                            return true;
                        },
                        content: function() {
                            'step 0'
                            var forced = false;
                            if (trigger.name == 'die') forced = true;
                            player.chooseTarget(get.prompt2('radiance_caishe'), forced, function(card, player, target) {
                                return target != player && target.getSkills(true, false, true).length > 0;
                            }).set('ai', function(target) {
                                if (get.attitude(_status.event.player, target) > 1 && _status.event.triggername != 'phaseBegin') return 0.001;
                                var skills = target.getSkills(true, false, true);
                                var skills2 = target.getOriginalSkills();
                                for (var i = 0; i < skills2.length; i++) {
                                    if (lib.skill[skills2[i]]) {
                                        skills.add(skills2[i]);
                                    }
                                }
                                for (var i = 0; i < skills.length; i++) {
                                    var index = skills[i].indexOf('_');
                                    if (index == 0 || get.translation(skills[i]) == skills[i]) {
                                        skills.splice(i--, 1);
                                    } else {
                                        var info = get.info(skills[i]);
                                        if (info.charlotte || info.debuff || player.hasSkill(skills[i]) || info.zhuSkill || info.juexingji || info.dutySkill) {
                                            skills.splice(i--, 1);
                                        }
                                    }
                                }
                                var max = 0;
                                var cond = 'out';
                                if (_status.event.triggername == 'phaseBefore') {
                                    cond = 'in';
                                }
                                for (var i = 0; i < skills.length; i++) {
                                    var rank = get.skillRank(skills[i], cond);
                                    if (typeof rank == 'number') max = Math.max(rank, max);
                                }
                                return (Math.abs(get.attitude(_status.event.player, target)) * max + max);
                            }).set('triggername', trigger.name);
                            'step 1'
                            if (result.bool) {
                                event.had = true;
                                var target = result.targets[0];

                                event.target = target;
                                event.skills = target.getOriginalSkills();
                                var skills2 = target.getSkills(true, false, true);
                                for (var i = 0; i < skills2.length; i++) {
                                    if (lib.skill[skills2[i]]) {
                                        event.skills.add(skills2[i]);
                                    }
                                }

                                for (var i = 0; i < event.skills.length; i++) {
                                    var index = event.skills[i].indexOf('_');
                                    if (index == 0 || get.translation(event.skills[i]) == event.skills[i]) {
                                        event.skills.splice(i--, 1);
                                    } else {
                                        var info = get.info(event.skills[i]);
                                        if (!info || info.charlotte || info.debuff || info.zhuSkill || info.juexingji || info.dutySkill) {
                                            event.skills.splice(i--, 1);
                                        }
                                    }
                                }
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (event.skills.length < 1) {
                                ui.create.dialog('无可获得技能');
                                game.delay(2);
                                event.finish();
                            }
                            'step 3'
                            event.videoId = lib.status.videoId++;
                            var func = function(id, list) {
                                var choiceList = ui.create.dialog('选择任意一个技能并获得，或点取消返回目标选择');
                                choiceList.videoId = id;
                                for (var i = 0; i < list.length; i++) {
                                    var str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                                    str += get.translation(list[i]);
                                    str += '</div>';
                                    var next = choiceList.add(str);
                                    next.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                                    next.firstChild.link = i;
                                    for (var j in lib.element.button) {
                                        next[j] = lib.element.button[i];
                                    }
                                    choiceList.buttons.add(next.firstChild);
                                }
                                return choiceList;
                            };
                            event.dialog = func(event.videoId, event.skills);
                            if (player != game.me || _status.auto) {
                                event.dialog.style.display = 'none';
                            }
                            var next = player.chooseButton();
                            next.set('dialog', event.videoId);
                            next.set('selectButton', 1);
                            next.set('ai', function(button) {
                                var player = _status.event.player;
                                var skill2 = _status.event.skills[button.link];

                                var length = _status.event.skills.length;
                                var cond = 'out';
                                if (_status.event.triggername == 'phaseBegin') {
                                    cond = 'in';
                                }
                                var rank = get.skillRank(skill2, cond);
                                if (rank) {
                                    return rank;
                                } else {
                                    if (length == 1) {
                                        return 1;
                                    } else if (length <= 3 && button.link == 2) {
                                        return length;
                                    }
                                }
                                return Math.floor(Math.random() * length);
                            });
                            next.set('skills', event.skills);
                            next.set('triggername', trigger.name);
                            'step 4'
                            event.dialog.close();
                            if (result.bool) {
                                player.removeAdditionalSkill('radiance_caishe');
                                if (player.storage.radiance_caishe) player.storage.radiance_caishe.removeSkill('radiance_caishe_disable');
                                event.target.removeSkill('radiance_caishe_disable');

                                var index = result.links[0];
                                event.skill2 = event.skills[index];
                                //player.storage.radiance_caishe_skill = event.skill2;
                            } else {
                                event.goto(0);
                            }
                            'step 5'
                            game.log(player, '获得了技能', '#g【' + get.translation(event.skill2) + '】');
                            player.addExpose(0.2);
                            player.addAdditionalSkill('radiance_caishe', event.skill2);
                            player.storage.radiance_caishe = event.target;
                            event.target.storage.radiance_caishe_skill = event.skill2;
                            event.target.storage.radiance_caishe_source = player;
                            event.target.addSkill('radiance_caishe_disable');
                        },
                        ai: {
                            threaten: 2,
                        },
                    },
                    "radiance_caishe_disable": {
                        init: function(player, skill) {
                            // player.removeSkill(player.storage.radiance_caishe_skill);
                            player.disableSkill(skill, player.storage.radiance_caishe_skill);
                        },
                        onremove: function(player, skill) {
                            // player.addSkill(player.storage.radiance_caishe_skill);
                            player.enableSkill(skill)
                        },
                        mark: true,
                        marktext: "裁",
                        intro: {
                            content: function(storage, player, skill) {
                                return '失去了以下技能：' + get.translation(player.storage.radiance_caishe_skill);

                                var list = [];
                                for (var i in player.disabledSkills) {
                                    if (player.disabledSkills[i].contains(skill)) list.push(i);
                                };
                                if (list.length) {
                                    var str = '失效技能：';
                                    for (var i = 0; i < list.length; i++) {
                                        if (lib.translate[list[i] + '_info']) str += get.translation(list[i]) + '、';
                                    };
                                    return str.slice(0, str.length - 1);
                                };
                            },
                        },
                        trigger: {
                            global: 'dieAfter'
                        },
                        charlotte: true,
                        forced: true,
                        silent: true,
                        popup: false,
                        forceDie: true,
                        filter: function(event, player) {
                            return (player.storage.radiance_caishe_source == event.player);
                        },
                        content: function() {
                            player.removeSkill('radiance_caishe_disable');
                        },
                    },
                    "radiance_tianshu": {
                        trigger: {
                            player: ["damageBefore", "turnOverBefore"]
                        },
                        mark: true,
                        marktext: "枢",
                        intro: {
                            mark: function(dialog, content, player) {
                                if (player != game.me) return '观看牌堆顶四张牌';
                                if (get.itemtype(_status.pileTop) != 'card') return '牌堆顶无牌';

                                var cards = [];
                                for (var i = 0; i < Math.min(4, ui.cardPile.childNodes.length); i++) {
                                    var currentcard = ui.cardPile.childNodes[i];
                                    currentcard.vanishtag.length = 0;
                                    if (get.info(currentcard).vanish || currentcard.storage.vanish) {
                                        currentcard.remove();
                                        continue;
                                    }
                                    cards.push(currentcard);
                                }
                                dialog.add(cards);
                            },
                        },
                        firstDo: true,
                        forced: true,
                        fixed: true,
                        superCharlotte: true,
                        charlotte: true,
                        zero: true,
                        filter: function(event, player) {
                            if (event.name == 'turnOver') {
                                return !player.isTurnedOver()
                            } else if (event.name != 'damage') return true;
                            return (!event.card || !event.cards || event.cards.length != 1 || !lib.watersky.func.isSameCard(event.card, event.cards[0]) || !event.card.isCard || event.nocard || event.skill);
                        },
                        content: function() {
                            trigger.cancel();
                        },
                        ai: {
                            nodamage: true,
                            noturn: true,
                            nofire: true,
                            nothunder: true,
                            effect: {
                                target: function(card, player, target, current) {
                                    if (get.tag(card, 'damage') && !card.isCard) return [0, 0];
                                }
                            },
                        },
                    },
                },
                translate: {
                    "radiance_losehp1": "失去体力1",
                    "radiance_losehp1_info": "当你成为其他角色的基本牌或非延时类的锦囊牌的目标后，你可以失去一点体力，令该牌对你无效。",
                    "radiance_losehp2": "失去体力2",
                    "radiance_losehp2_info": "当你成为一张其他角色的牌的目标时，你可以失去一点体力，然后取消此目标。",
                    "radiance_losehp3": "失去体力3",
                    "radiance_losehp3_info": "当你受到伤害时，你可以失去一点体力，然后取消之。",
                    "radiance_forbid": "禁牌",
                    "radiance_noequip2": "无视防具",
                    "radiance_wudi": "伤害无效",

                    "radiance_zhisu": "质素",
                    "radiance_zhisu_info": "出牌阶段限一次，你观看牌堆顶的X张牌，然后选择获得这些牌中的任意牌；若剩余的牌中有点数为1、2、3、5、7、J、K的牌，你可以对一名其他角色造成等量的伤害。（X为你已失去的体力值+1）",
                    "radiance_guiji": "轨迹",
                    "radiance_guiji_info": "当一名角色使用牌指定你为目标时，你可以令此牌对你无效并令一名其他角色代替你成为此牌的目标；若此牌不为伤害牌或目标数大于1，你摸两张牌。最后你失去一点体力。",

                    "radiance_yanzhen": "严阵",
                    "radiance_yanzhen_info": "当一张非延时类锦囊牌被【无懈可击】响应后，你可以获得该锦囊牌；且若你非此【无懈可击】的使用者，你也获得此【无懈可击】。你的非延时类锦囊牌不会被【无懈可击】响应。",
                    "radiance_hunlie": "魂烈",
                    "radiance_hunlie_info": "限定技，出牌阶段，你可以摸X张牌并获得X个“军魂”标记。（X为为你的已损失体力值+1且至少为3）",
                    "radiance_junhun": "军魂",
                    "radiance_junhun_info": "当你受到伤害时，可以移除一个“军魂”，令此伤害-1。当你需要使用或打出一张【杀】时，你可以选择移除一个“军魂”，视为使用或打出之。",
                    "radiance_junhun_sha": "军魂",
                    "radiance_junhun_damage": "军魂",
                    "radiance_shangwu": "尚武",
                    "radiance_shangwu_info": "主公技，其他与你势力相同的角色使用【杀】造成伤害后，可以令你判定一次。若为红色，你获得一个“军魂”标记。",


                    "radiance_shouxun": "授勋",
                    "radiance_shouxun_info": "出牌阶段限一次，你可以将一张【杀】交给其他角色，然后你摸两张牌。",
                    "radiance_tongguan": "统观",
                    "radiance_tongguan_info": "结束阶段，若你本回合没有使用【杀】造成伤害，你可以观看牌堆顶的五张牌并从中选择一张获得，然后将其余的牌以任意顺序置于牌堆顶或牌堆底。",
                    "radiance_kuanzhi": "宽治",
                    "radiance_kuanzhi_info": "主公技，其他与你势力相同的角色使用【杀】被【闪】响应后，其可以你获得一个“军魂”标记。",


                    "radiance_longduan": "垄断",
                    "radiance_longduan_info": "摸牌阶段，你可以放弃摸牌，改为获得所有其他角色各一张手牌，然后弃置X张牌。（X为你的体力值）",
                    "radiance_suanjin": "算尽",
                    "radiance_suanjin_info": "锁定技，当你失去手牌或者装备区内的所有牌后，若你已受伤，你回复一点体力，否则你失去一点体力。",
                    "radiance_kongyin": "空音",
                    "radiance_kongyin_info": "出牌阶段每项各限一次：1.将一张手牌交给一名其他角色，令其失去一点体力；2.弃置至少两张花色各不同的手牌，令一名其他角色摸X张牌并翻面。（X为4减去弃置的牌数）",
                    "radiance_chuilian": "垂怜",
                    "radiance_chuilian_info": "一名角色受到伤害后，若该角色受到此伤害前未受伤，你可以摸一张牌。",
                    "radiance_xianzhu": "贤助",
                    "radiance_xianzhu_info": "摸牌阶段，你可以放弃摸牌，改为令一名角色将其手牌补至体力上限（至多为5）；若其摸牌不超过三张，你摸一张牌。",
                    "radiance_gongqiao": "工巧",
                    "radiance_gongqiao_info": "一名其他角色使用【杀】造成伤害时，你可以展示并交给伤害来源一张手牌。若此牌为黑色，此伤害+1；若为红色，你回复一点体力。",

                    "radiance_tuanjie": "团结",
                    "radiance_tuanjie_info": "出牌阶段限一次，你可以令所有角色依次选择将一张手牌交给其他角色并摸一张牌。",
                    "radiance_xisheng": "牺牲",
                    "radiance_xisheng_info": "当你受到伤害后，你可以选择至多X名伤害来源以外的角色，令伤害来源摸一张牌，你选择的角色各摸三张牌。（X为该伤害的点数）",
                    "radiance_ganzhao": "感召",
                    "radiance_ganzhao_info": "主公技，你的弃牌阶段开始时，若你需要弃牌，你可以令所有与你势力相同的其他角色依次选择是否弃置一张牌；若有角色弃牌，你的弃牌阶段跳过。",
                    "radiance_chayi": "察异",
                    "radiance_chayi_info": "摸牌阶段开始时，你可以令由你下家开始，所有角色依次摸一张牌然后弃一张牌。若如此做，你获得这些弃牌中花色各不同的X张，或将本阶段的摸牌数改为X。（X为弃置的牌中的花色数）",
                    "radiance_biyou": "庇佑",
                    "radiance_biyou_info": "锁定技，你的回合外，当你使用或打出一张牌后，防止你受到所有的伤害直至回合结束。",
                    "radiance_huizhao": "辉照",
                    "radiance_huizhao_info": "准备阶段开始时，你可以选择一项：1.本回合的摸牌阶段所有角色依次摸一张牌，你于此阶段额外摸两张牌；2.本回合的结束阶段，你摸三张牌。",
                    "radiance_zhenjie": "贞洁",
                    "radiance_zhenjie_info": "当你成为其他角色的【杀】或非延时类锦囊牌的目标后，若此牌只有一个目标，你可以与使用者拼点。若你赢，此牌对你无效；若你没赢，你获得此牌。",
                    "radiance_dianlu": "典录",
                    "radiance_dianlu_info": "当你或一名在你攻击范围内的角色使用或打出一张【闪】后，你可以摸一张牌。",
                    "radiance_dizui": "涤罪",
                    "radiance_dizui_info": "你的回合外，当你失去一张牌后，你可以选择一名与你距离1或以内的其他角色。该角色直至回合结束技能全部失效，且你令其打出一张【闪】。若不打出，其受到一点雷电伤害，且若此时你为你本回合第二次发动“涤罪”，其直至回合结束不能使用或打出牌。你与其他角色计算距离时-X。（X为你已损失的体力值；场上有角色濒死时伤害延后至濒死后结算）",

                    "radiance_tianxuan": "天璇",
                    "radiance_tianxuan_info": "当你进行判定前，你可以随机观看四种花色的牌各一张，选择其中一张牌并获得，此次判定结果视为此牌。",
                    "radiance_xianyue": "仙乐",
                    "radiance_xianyue_info": "出牌阶段开始时，你可以翻面，然后获得以下效果直至下回合开始：<br>1.每名角色限一次，你的武将牌为正面朝上，当其造成伤害时，你可以令其判定：若结果为黑色，此伤害+1；否则你摸一张牌；<br>2.每名角色限一次，你的武将牌为背面朝上，当其受到伤害时，你可以令其判定。若结果为红色，此伤害+1；否则你摸一张牌。若你为进行判定的角色则两项各限一次，且结果为摸牌时改为摸两张牌。",
                    "radiance_yunming": "运命",
                    "radiance_yunming_info": "一名角色的判定牌生效前，你可以打出一张黑色手牌。若如此做，你选择此判定结果的点数和花色。",
                    "radiance_tianze": "天择",
                    "radiance_tianze_info": "出牌阶段限一次，你选择顺时针或逆时针，由你开始，按此顺序所有角色依次弃置一张点数比上一张牌大的手牌，直至有角色不如此做或所有角色均已弃置；若有其他角色不如此做，你可以对该角色造成一点伤害，或获得其他角色因此弃置的所有牌。",


                    "radiance_siqi": "死气",
                    "radiance_siqi_info": "当一名角色进入濒死时，你可以摸一张牌。",
                    "radiance_duanming": "断冥",
                    "radiance_duanming_info": "出牌阶段开始时，你可以弃置一张黑色牌。若如此做，直至回合结束，除你以外的所有角色技能失效，不能获得牌，非濒死状态不能使用或打出牌。",
                    "radiance_duanming_db": "断冥",
                    "radiance_yujia": "驭假",
                    "radiance_yujia_info": "当你需要使用或打出一张【杀】，【闪】或者【无懈可击】时，可以将一张牌当作之使用。若如此作，你获得一个“假”标记。有“假”标记的人角色视为拥有技能“侵蚀”。",
                    "radiance_jiayi": "嫁移",
                    "radiance_jiayi_info": "当你受到伤害后，可以将等同于伤害数值的“假”标记移给伤害来源。场上每有一名其他角色有“假”标记，你摸牌阶段额外摸一张牌。",
                    "radiance_qinshi": "侵蚀",
                    "radiance_qinshi_info": "锁定技，你的结束阶段，若场上没有角色拥有技能“驭假”，或你有至少两个“假”标记，你移除所有“假”标记，然后失去一点体力。若你拥有技能“驭假”，改为至少四个标记，且你先摸两张牌再失去体力。",

                    "radiance_jingji": "荆棘",
                    "radiance_jingji_info": "你的回合外，当一名角色成为【杀】的目标时，若你也在来源的攻击范围内，你可以从手牌打出一张基本牌，令来源选择一项：1.打出一张【闪】并令此【杀】对目标角色无效；2.根据你打出的牌执行后续效果：【杀】：来源受到两点冰属性伤害；【闪】：你获得来源一张牌和此【杀】的实体牌；其他：你与目标角色各摸两张牌。",
                    "radiance_zhanfang": "绽放",
                    "radiance_zhanfang_info": "限定技，出牌阶段，你展示牌堆顶五张牌，若这些牌中没有【杀】，则你继续展示牌堆顶的牌；直至展示的牌中有【杀】为止，你获得这些牌，这些牌本回合不计入手牌上限，你本回合使用【杀】没有距离限制。",
                    "radiance_zhanfang_af": "绽放",

                    "radiance_gongfa": "共伐",
                    "radiance_gongfa_info": "锁定技，你的防具区废除。当一名角色使用【杀】时，若你在其攻击范围内且你不是此【杀】的目标，你摸一张牌并额外成为此【杀】的目标。",
                    "radiance_baohui": "暴毁",
                    "radiance_baohui_info": "当一张草花【杀】结算完毕后，若你是目标之一，你可以获得之；你使用草花【杀】没有次数限制。",
                    "radiance_pangran": "庞然",
                    "radiance_pangran_info": "锁定技，你不能使用或打出【闪】。出牌阶段，你可以弃置任意数量的【闪】，然后摸等量的牌。",
                    "radiance_mengdu": "猛毒",
                    "radiance_mengdu_info": "出牌阶段限一次，你可以令一名有手牌的其他角色展示所有手牌。若其有【杀】或【闪】，其需选择一项：1.弃置所有【杀】和【闪】；2.失去一点体力。",


                    "radiance_caishe": "裁设",
                    "radiance_caishe_info": "游戏开始时、你的回合开始前和结束后，你可以选择一名其他角色并选择该角色的一个非觉醒技、使命技、主公技的技能获得（同时最多拥有一个）。只要你以此法获得了技能，原本拥有者的那个技能便失效。原本拥有者死亡时，你需重新进行选择。",
                    "radiance_caishe_disable": "裁设",
                    "radiance_tianshu": "天枢",
                    "radiance_tianshu_info": "锁定技，牌堆顶的四张牌对你可见；你不会被翻面或受到无对应非转换实体牌的伤害。",
                },
            },
            intro: "",
            author: "水天一色",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        },
        files: {
            "character": [],
            "card": [],
            "skill": []
        }
    }
})