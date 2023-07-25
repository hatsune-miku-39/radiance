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

            if (config.radianceOnly) {
                for (var i in lib.character) {
                    if (i.indexOf('radiance') == 0) continue;
                    if (!lib.character[i][4]) lib.character[i].add([]);
                    lib.character[i][4].add('unseen');
                };
            };
            if (config.radianceGroupChoose) {
                lib.skill._radiance_groupchoose = {
                    trigger: {
                        global: ["gameStart"],
                    },
                    firstDo: true,
                    forced: true,
                    fixed: true,
                    superCharlotte: true,
                    charlotte: true,
                    popup: false,
                    priority: 99999,
                    filter: function(event, player) {
                        var name = player.name;
                        if (name.indexOf('radiance') != 0) return false;
                        var info = lib.character[name];
                        if (!info) {
                            info = lib.character[player.name1];
                            if (!info) {
                                return false;
                            }
                        }
                        if (!['radiance_group_free', 'radiance_group_underworld', 'radiance_group_heaven'].contains(info[1])) return false;
                        return true;
                    },
                    content: function() {
                        'step 0'
                        var group = [];
                        var choices = [];
                        var basic = ['wei', 'shu', 'wu', 'qun', 'jin',
                            'radiance_group_magic', 'radiance_group_heng', 'radiance_group_union', 'radiance_group_church',
                        ];
                        for (var i in lib.character) {
                            if (Array.isArray(lib.character[i][4]) && (lib.character[i][4].contains('unseen') || lib.character[i][4].contains('unseen'))) continue;
                            group.add(lib.character[i][1]);
                        }
                        for (var i = 0; i < basic.length; i++) {
                            if (group.contains(basic[i])) {
                                choices.push(basic[i]);
                                group.remove(basic[i]);
                            }
                        }
                        choices = choices.concat(group);
                        choices.removeArray(['shen', 'radiance_group_free', 'radiance_group_underworld', 'radiance_group_heaven']);
                        event.choices = choices;
                        player.chooseControl(choices).set('prompt', '请选择变为一个势力').set('ai', function(event, player) {
                            var choices = event.choices;
                            var zhu = get.zhu(player);
                            if (zhu && zhu != player) {
                                if (zhu.group && choices.contains(zhu.group)) return zhu.group;
                            }
                            var name = player.name;
                            return choices.randomGet();
                            var info = lib.character[name];
                            if (!info) {
                                info = lib.character[player.name1];
                                if (!info) {
                                    return choices.randomGet();
                                }
                            }
                            var cset = info[4];
                            var str;
                            if (cset) {
                                if (cset.contains('group_jin') && !lib.config['extension_校园杀_nsfzxysGroupShiChange']) {
                                    str = 'jin';
                                } else if (cset.contains('group_wei')) {
                                    str = 'wei';
                                } else if (cset.contains('group_shu')) {
                                    str = 'shu';
                                } else if (cset.contains('group_wu')) {
                                    str = 'wu';
                                } else if (cset.contains('group_qun')) {
                                    str = 'qun';
                                }
                                if (str) str = nsfzxys_grouprelation(str, lib.config['extension_校园杀_nsfzxysGroupTKChange']);
                                if (str && choices.contains(str)) return str;
                            }
                            return choices.randomGet();
                        });
                        'step 1'
                        player.changeGroup(result.control, false);
                        //player.group = result.control;
                    },
                };
            };
            if (config.radianceEnhanceZhu && !game.enhanceZhu) {
                game.enhanceZhu = true;
                lib.skill._radiance_enhancezhu = {
                    trigger: {
                        global: ['gameStart'],
                    },
                    forced: true,
                    fixed: true,
                    superCharlotte: true,
                    charlotte: true,
                    popup: false,
                    firstDo: true,
                    priority: 300000,
                    filter: function(event, player, name) {
                        var zhu = get.zhu(player);
                        return player == zhu;
                    },
                    content: function() {
                        'step 0'
                        player.addSkill('radiance_zhu');
                        var num = get.population('zhong');
                        if (player.identity == 'rZhu') num = get.population('rZhong') + get.population('bNei');
                        if (player.identity == 'bZhu') num = get.population('bZhong') + get.population('rNei');
                        player.maxHp += num;
                        player.hp += num;
                        player.update;
                    },
                };
            };

            // 滴炎尘气耀暮
            // Pack
            var radiance_pack = {
                character: {
                    "radiance_ma001_clark": ["male", "radiance_group_magic", 4, ["radiance_bofa", "radiance_xuehui"],
                        ["zhu"]
                    ],
                    "radiance_ma002_dai": ["male", "radiance_group_magic", 3, ["radiance_tianyi", "radiance_pofa"],
                        []
                    ],
                    "radiance_ma004_watersky": ["female", "radiance_group_magic", 3, ["radiance_zhisu", "radiance_guiji"],
                        []
                    ],
                    "radiance_ma005_maria": ["female", "radiance_group_magic", 3, ["radiance_aofa", "radiance_jingyao"],
                        []
                    ],
                    "radiance_ma007_tima": ["female", "radiance_group_magic", 3, ["radiance_lingyao", "radiance_mingyong"],
                        []
                    ],
                    "radiance_ma009_draco": ["male", "radiance_group_magic", 4, ["radiance_yingcai", "radiance_tulong"],
                        []
                    ],
                    "radiance_ma011_zero": ["female", "radiance_group_magic", 3, ["radiance_fengdong", "radiance_jingti"],
                        []
                    ],
                    "radiance_ma012_grey": ["male", "radiance_group_magic", 3, ["radiance_heidong", "radiance_xuling"],
                        []
                    ],
                    "radiance_ma013_einxis": ["male", "radiance_group_magic", "4/5", ["radiance_mojian", "radiance_guanduan", "radiance_cangkong"],
                        []
                    ],
                    "radiance_ma014_shirona": ["female", "radiance_group_magic", 3, ["radiance_ponian", "radiance_hongguan"],
                        []
                    ],
                    "radiance_ma015_luia": ["female", "radiance_group_magic", 4, ["radiance_wanling", "radiance_fuxing", "radiance_cheli"],
                        []
                    ],

                    "radiance_he001_xueli": ["male", "radiance_group_heng", 4, ["radiance_yanzhen", "radiance_hunlie", "radiance_shangwu"],
                        ["zhu"]
                    ],
                    "radiance_he003_yuchizhongming": ["male", "radiance_group_heng", 4, ["radiance_weipo"],
                        []
                    ],
                    "radiance_he004_zhaoshaolong": ["male", "radiance_group_heng", 4, ["radiance_xianzhuo", "radiance_danlue"],
                        []
                    ],
                    "radiance_he006_liuye": ["female", "radiance_group_heng", 3, ["radiance_feiren", "radiance_qiaowu"],
                        []
                    ],
                    "radiance_he007_xuanzhen": ["male", "radiance_group_heng", 4, ["radiance_shouwu", "radiance_zhidou"],
                        []
                    ],
                    "radiance_he009_xuezhao": ["male", "radiance_group_heng", 4, ["radiance_tangong", "radiance_zhengbian"],
                        []
                    ],
                    "radiance_he010_xuening": ["male", "radiance_group_heng", 3, ["radiance_shouyue", "radiance_tongguan", "radiance_kuanzhi"],
                        ["zhu"]
                    ],
                    "radiance_he011_yangtaihou": ["female", "radiance_group_heng", 3, ["radiance_muyi", "radiance_shezheng"],
                        []
                    ],
                    "radiance_he014_litaicheng": ["male", "radiance_group_heng", 4, ["radiance_wubei", "radiance_lizheng"],
                        []
                    ],

                    "radiance_un001_richard": ["male", "radiance_group_union", 3, ["radiance_caopan", "radiance_tunji", "radiance_guchui"],
                        ["zhu"]
                    ],
                    "radiance_un002_schwarz": ["female", "radiance_group_union", 4, ["radiance_yingcai", "radiance_chizi"],
                        []
                    ],
                    "radiance_un003_yanghua": ["female", "radiance_group_union", 3, ["radiance_longduan", "radiance_suanjin"],
                        []
                    ],
                    "radiance_un004_reine": ["female", "radiance_group_union", 3, ["radiance_kongyin", "radiance_chuilian"],
                        []
                    ],
                    "radiance_un005_helena": ["female", "radiance_group_union", 3, ["radiance_douyan", "radiance_huanxing"],
                        ["doublegroup:radiance_group_union:radiance_group_magic"]
                    ],
                    "radiance_un006_cresa": ["female", "radiance_group_union", 3, ["radiance_huajian", "radiance_yueyin"],
                        []
                    ],
                    "radiance_un007_huangqiqiao": ["female", "radiance_group_union", 3, ["radiance_xianzhu", "radiance_gongqiao"],
                        []
                    ],
                    "radiance_un008_gelamo": ["male", "radiance_group_union", 4, ["radiance_lizhan", "radiance_nuyong"],
                        []
                    ],
                    "radiance_un013_gaius": ["male", "radiance_group_union", 4, ["radiance_mingke", "radiance_kongzhi"],
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
                    "radiance_ch004_watersky": ["female", "radiance_group_church", 3, ["radiance_dianlu", "radiance_dizui"],
                        []
                    ],
                    "radiance_ch005_weiencao": ["male", "radiance_group_church", 4, ["radiance_suzheng"],
                        []
                    ],
                    "radiance_ch006_louise": ["female", "radiance_group_church", 3, ["radiance_xinxiang", "radiance_haoai"],
                        []
                    ],
                    "radiance_ch010_paul": ["male", "radiance_group_church", 4, ["radiance_yangzhu", "radiance_youguo"],
                        ["zhu"]
                    ],
                    "radiance_ch011_janedoe": ["female", "radiance_group_church", 3, ["radiance_kaicheng", "radiance_chuhai", "radiance_junheng"],
                        []
                    ],
                    "radiance_ch015_julia": ["female", "radiance_group_church", 2, ["radiance_yingling", "radiance_tianshu", "radiance_huiwang"],
                        []
                    ],

                    "radiance_hv001_reine": ["female", "radiance_group_heaven", 3, ["radiance_tianxuan", "radiance_xianyue"],
                        []
                    ],
                    "radiance_hv003_norn": ["female", "radiance_group_heaven", 4, ["radiance_yunming", "radiance_tianze"],
                        []
                    ],
                    "radiance_hv004_veronia": ["female", "radiance_group_heaven", 3, ["radiance_qiongguang", "radiance_tianji"],
                        []
                    ],
                    "radiance_hv006_lixian": ["female", "radiance_group_heaven", 3, ["radiance_xianyi", "radiance_quhai"],
                        []
                    ],
                    "radiance_hv007_yinghe": ["female", "radiance_group_heaven", 3, ["radiance_heyu", "radiance_xianci"],
                        []
                    ],


                    "radiance_ud002_agares": ["male", "radiance_group_underworld", 4, ["radiance_siqi", "radiance_hunduan"],
                        []
                    ],
                    "radiance_ud003_youfa": ["male", "radiance_group_underworld", 4, ["radiance_yindun", "radiance_huoshi"],
                        []
                    ],
                    "radiance_ud004_rein": ["female", "radiance_group_underworld", 3, ["radiance_jiguang", "radiance_tianquan", "radiance_jimie"],
                        []
                    ],
                    "radiance_ud005_doris": ["female", "radiance_group_underworld", "1/3", ["radiance_cancun", "radiance_shangyu"],
                        []
                    ],
                    "radiance_ud006_pestilence": ["male", "radiance_group_underworld", 4, ["radiance_wenyi"],
                        []
                    ],
                    "radiance_ud007_wangruize": ["male", "radiance_group_underworld", 3, ["radiance_yujia", "radiance_jiayi"],
                        []
                    ],
                    "radiance_ud008_rosa": ["female", "radiance_group_underworld", 3, ["radiance_moxiang", "radiance_zaichun"],
                        []
                    ],
                    "radiance_ud009_xunsishen": ["male", "radiance_group_underworld", 4, ["radiance_zhuisi", "radiance_nanming"],
                        []
                    ],
                    "radiance_ud011_crimsoul": ["male", "radiance_group_underworld", 4, ["radiance_huisheng", "radiance_yuanhun"],
                        []
                    ],

                    "radiance_fr001_lotustar": ["male", "radiance_group_free", 3, ["radiance_weiyong", "radiance_yingzhi"],
                        []
                    ],
                    "radiance_fr001ft_lotustar": ["male", "radiance_group_free", 3, ["radiance_chilie", "radiance_yaoguang", "radiance_bengyao"],
                        []
                    ],
                    "radiance_fr001dk_lotustar": ["male", "radiance_group_free", 3, ["radiance_yingxue", "radiance_zhoufa"],
                        []
                    ],
                    "radiance_fr002_lizhaoyue": ["female", "radiance_group_free", 3, ["radiance_zhanque", "radiance_xiangyun"],
                        []
                    ],
                    "radiance_fr004_veronia": ["female", "radiance_group_free", 3, ["radiance_baiyi", "radiance_fengxing"],
                        []
                    ],
                    "radiance_fr005_luia": ["female", "radiance_group_free", 3, ["radiance_wanxiang", "radiance_qiongjiu"],
                        []
                    ],

                    "radiance_fr010_lotusun": ["male", "radiance_group_free", 4, ["radiance_yingcai", "radiance_chenji"],
                        []
                    ],
                    "radiance_fr011_alabai": ["male", "radiance_group_free", 3, ["radiance_zhaoyao", "radiance_jianshang"],
                        []
                    ],
                    "radiance_fr012_kicker": ["male", "radiance_group_free", 4, ["radiance_baoji", "radiance_jiabei"],
                        []
                    ],
                    "radiance_fr014_yeting": ["female", "radiance_group_free", 3, ["radiance_wenyu", "radiance_piaoling"],
                        []
                    ],
                    "radiance_fr015_xiuyin": ["male", "radiance_group_free", 3, ["radiance_zaowu", "radiance_sanyuan"],
                        []
                    ],
                    "radiance_fr016_yunzhongzi": ["male", "radiance_group_heng", 4, ["radiance_yunjian", "radiance_leiyin"],
                        []
                    ],


                    "radiance_nh001_luna": ["female", "radiance_group_magic", 3, ["radiance_jiaoyan", "radiance_tianhua"],
                        []
                    ],
                    "radiance_nh004_maya": ["female", "radiance_group_free", 3, ["radiance_diewu", "radiance_fengying"],
                        []
                    ],
                    "radiance_nh007_sarah": ["female", "radiance_group_free", 3, ["radiance_yidai", "radiance_renlin", "radiance_jianxing"],
                        []
                    ],
                    "radiance_nh008_yinlong": ["male", "radiance_group_heng", 4, ["radiance_tenglong", "radiance_juesha"],
                        []
                    ],
                    "radiance_nh00": ["female", "radiance_group_free", 4, ["radiance_danda", "radiance_fenqi"],
                        ['unseen']
                    ],
                    "radiance_nh011_wawel": ["none", "radiance_group_magic", 7, ["radiance_gongfa", "radiance_baohui"],
                        []
                    ],
                    "radiance_nh012_hydra": ["none", "radiance_group_union", 7, ["radiance_pangran", "radiance_mengdu"],
                        []
                    ],
                    "radiance_nh013_tianfa": ["none", "radiance_group_church", 6, ["radiance_weihao"],
                        []
                    ],

                    "radiance_000_infinity": ["female", "radiance_group_free", 3, ["radiance_caishe", "radiance_jixing"],
                        []
                    ],

                },
                characterSort: {
                    "mode_extension_星耀璨然": {
                        "radiance_magic": [
                            "radiance_ma001_clark", "radiance_ma002_dai", "radiance_ma004_watersky", "radiance_ma005_maria",
                            "radiance_ma007_tima", "radiance_ma009_draco",
                            "radiance_ma011_zero", "radiance_ma012_grey", "radiance_ma013_einxis", "radiance_ma014_shirona", "radiance_ma015_luia",
                        ],
                        "radiance_heng": [
                            "radiance_he001_xueli", "radiance_he003_yuchizhongming", "radiance_he004_zhaoshaolong",
                            "radiance_he006_liuye", "radiance_he007_xuanzhen", "radiance_he009_xuezhao", "radiance_he010_xuening",
                            "radiance_he011_yangtaihou", "radiance_he014_litaicheng",
                        ],
                        "radiance_union": [
                            "radiance_un001_richard", "radiance_un002_schwarz", "radiance_un003_yanghua", "radiance_un004_reine", "radiance_un005_helena",
                            "radiance_un006_cresa", "radiance_un007_huangqiqiao", "radiance_un008_gelamo",
                            "radiance_un013_gaius",
                        ],
                        "radiance_church": [
                            "radiance_ch001_agnes", "radiance_ch002_kelvin", "radiance_ch003_aurora", "radiance_ch004_watersky", "radiance_ch005_weiencao",
                            "radiance_ch006_louise", "radiance_ch010_paul",
                            "radiance_ch011_janedoe", "radiance_ch015_julia",
                        ],
                        "radiance_heaven": [
                            "radiance_hv001_reine", "radiance_hv003_norn", "radiance_hv004_veronia",
                            "radiance_hv006_lixian", "radiance_hv007_yinghe",
                        ],
                        "radiance_underworld": [
                            "radiance_fr001dk_lotustar", "radiance_ud002_agares", "radiance_ud003_youfa", "radiance_ud004_rein", "radiance_ud005_doris",
                            "radiance_ud006_pestilence", "radiance_ud007_wangruize", "radiance_ud008_rosa", "radiance_ud009_xunsishen",
                            "radiance_ud011_crimsoul",
                        ],
                        "radiance_nonhuman": [
                            "radiance_fr001ft_lotustar", "radiance_nh001_luna", "radiance_nh003_rose", "radiance_nh004_maya",
                            "radiance_nh007_sarah", "radiance_nh008_yinlong",
                            "radiance_nh011_wawel", "radiance_nh012_hydra", "radiance_nh013_tianfa",
                        ],
                        "radiance_free": [
                            "radiance_fr001_lotustar", "radiance_fr002_lizhaoyue", "radiance_fr004_veronia", "radiance_fr005_luia",
                            "radiance_fr010_lotusun",
                            "radiance_fr011_alabai", "radiance_fr012_kicker", "radiance_fr014_yeting", "radiance_fr015_xiuyin",
                            "radiance_fr016_yunzhongzi",
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
                    "radiance_nonhuman": "非人类",
                    "radiance_free": "自由者",

                    "radiance_ma001_clark": "克拉克",
                    "radiance_ma002_dai": "戴",
                    "radiance_ma004_watersky": "白泽水天",
                    "radiance_ma005_maria": "玛丽亚·伊娃",
                    "radiance_ma007_tima": "蒂玛",
                    "radiance_ma009_draco": "德拉科·马兰",
                    "radiance_ma011_zero": "零姬",
                    "radiance_ma012_grey": "葛雷·塞毕",
                    "radiance_ma013_einxis": "艾因克希斯",
                    "radiance_ma014_shirona": "城奈",
                    "radiance_ma015_luia": "露雅·加内斯",

                    "radiance_he001_xueli": "薛厉",
                    "radiance_he003_yuchizhongming": "尉迟仲明",
                    "radiance_he004_zhaoshaolong": "赵少龙",
                    "radiance_he006_liuye": "柳叶",
                    "radiance_he007_xuanzhen": "玄真",
                    "radiance_he009_xuezhao": "薛昭",
                    "radiance_he010_xuening": "薛宁",
                    "radiance_he011_yangtaihou": "羊太后",
                    "radiance_he014_litaicheng": "李泰城",
                    "radiance_he015_lizhaoyue": "李照月",

                    "radiance_un001_richard": "理查德",
                    "radiance_un002_schwarz": "舒华兹",
                    "radiance_un003_yanghua": "杨桦",
                    "radiance_un004_reine": "怜音",
                    "radiance_un005_helena": "海伦娜",
                    "radiance_un006_cresa": "克蕾莎",
                    "radiance_un007_huangqiqiao": "凰七巧",
                    "radiance_un008_gelamo": "格拉莫",
                    "radiance_un013_gaius": "盖乌斯",
                    "radiance_un015_vice": "拜斯",

                    "radiance_ch001_agnes": "圣雅妮二世",
                    "radiance_ch002_kelvin": "开尔文",
                    "radiance_ch003_aurora": "欧若拉",
                    "radiance_ch004_watersky": "白泽水天",
                    "radiance_ch005_weiencao": "韦恩·曹",
                    "radiance_ch006_louise": "路易斯",
                    "radiance_ch010_paul": "保罗五世",
                    "radiance_ch011_janedoe": "简·道伊",
                    "radiance_ch015_julia": "尤莉亚",

                    "radiance_hv001_reine": "怜音",
                    "radiance_hv003_norn": "诺恩",
                    "radiance_hv004_veronia": "薇洛妮亚",
                    "radiance_hv006_lixian": "璃仙",
                    "radiance_hv007_yinghe": "樱鹤",

                    "radiance_ud002_agares": "阿加雷斯",
                    "radiance_ud003_youfa": "幽伐",
                    "radiance_ud004_rein": "琳",
                    "radiance_ud005_doris": "朵丽丝",
                    "radiance_ud006_pestilence": "佩斯提勒斯",
                    "radiance_ud007_wangruize": "王锐泽",
                    "radiance_ud008_rosa": "萝莎",
                    "radiance_ud009_xunsishen": "巡死神",
                    "radiance_ud011_crimsoul": "猩红之魂",

                    "radiance_nh001_luna": "露娜",
                    "radiance_nh003_rose": "萝赛",
                    "radiance_nh004_maya": "梅亚",
                    "radiance_nh007_sarah": "塞拉",
                    "radiance_nh008_yinlong": "胤龙",
                    "radiance_nh011_wawel": "瓦维尔",
                    "radiance_nh012_hydra": "海德拉",
                    "radiance_nh013_tianfa": "天·罚",

                    "radiance_fr001_lotustar": "莲星",
                    "radiance_fr001ft_lotustar": "莲星",
                    "radiance_fr001dk_lotustar": "莲星",
                    "radiance_fr002_lizhaoyue": "李照月",
                    "radiance_fr003_vice": "拜斯",
                    "radiance_fr004_veronia": "薇洛妮亚",
                    "radiance_fr005_luia": "露雅·加内斯",

                    "radiance_fr010_lotusun": "莲曜",
                    "radiance_fr011_alabai": "阿拉白",
                    "radiance_fr012_kicker": "赌徒奇克",
                    "radiance_fr014_yeting": "夜汀",
                    "radiance_fr015_xiuyin": "修因",
                    "radiance_fr016_yunzhongzi": "云中子",

                    "radiance_000_infinity": "茵菲尼缇",
                },
                characterTitle: {
                    "radiance_ma001_clark": "追寻奥秘之人",
                    "radiance_ma002_dai": "大魔导师",
                    "radiance_ma004_watersky": "解析者",
                    "radiance_ma005_maria": "法歌双绝",
                    "radiance_ma007_tima": "悠久的贤人",
                    "radiance_ma009_draco": "屠龙绝艺",
                    "radiance_ma011_zero": "冰晶之海",
                    "radiance_ma012_grey": "虚空术士",
                    "radiance_ma013_einxis": "法皇剑",
                    "radiance_ma014_shirona": "十八虹的冠绝",
                    "radiance_ma015_luia": "万灵的魔导师",

                    "radiance_he001_xueli": "衡太祖",
                    "radiance_he003_yuchizhongming": "威武大将军",
                    "radiance_he004_zhaoshaolong": "龙威虎胆",
                    "radiance_he006_liuye": "月下美刃",
                    "radiance_he007_xuanzhen": "武头陀",
                    "radiance_he010_xuening": "当朝天子",

                    "radiance_un001_richard": "商会首脑",
                    "radiance_un003_yanghua": "产业龙头",
                    "radiance_un004_reine": "坠天之羽",
                    "radiance_un005_helena": "幻形的召使",
                    "radiance_un006_cresa": "月痕剑",
                    "radiance_un008_gelamo": "百战老兵",
                    "radiance_un013_gaius": "虚无的侦探",

                    "radiance_ch001_agnes": "女教宗",
                    "radiance_ch002_kelvin": "圣骑士长",
                    "radiance_ch003_aurora": "晓光百合",
                    "radiance_ch004_watersky": "记录者",
                    "radiance_ch005_weiencao": "肃清者",
                    "radiance_ch006_louise": "圣女",
                    "radiance_ch010_paul": "护国的皇子",
                    "radiance_ch011_janedoe": "无名的虔信者",
                    "radiance_ch015_julia": "卫道的圣精灵",

                    "radiance_hv001_reine": "悯天使",
                    "radiance_hv003_norn": "命运女神",
                    "radiance_hv004_veronia": "铠羽晨光",

                    "radiance_ud002_agares": "恶魔大公",
                    "radiance_ud003_youfa": "冥公子",
                    "radiance_ud004_rein": "夜天的终末骑士",
                    "radiance_ud005_doris": "天魔像偶",
                    "radiance_ud006_pestilence": "苍白之王",
                    "radiance_ud007_wangruize": "冥灵唤者",
                    "radiance_ud008_rosa": "魔之花",
                    "radiance_ud011_crimsoul": "暗血的死骑",

                    "radiance_nh001_luna": "华月美姬",
                    "radiance_nh003_rose": "玫瑰女皇",
                    "radiance_nh004_maya": "摇曳之蝶",
                    "radiance_nh007_sarah": "剑刃妖精",

                    "radiance_fr001_lotustar": "赤红的勇者",
                    "radiance_fr001ft_lotustar": "崩日的勇者",
                    "radiance_fr001dk_lotustar": "黑血的使者",
                    "radiance_fr002_lizhaoyue": "朗月高照",
                    "radiance_fr004_veronia": "自由游风",
                    "radiance_fr005_luia": "万象的探索者",
                    "radiance_fr010_lotusun": "严酷的坚壁",

                    "radiance_fr011_alabai": "沙海巨奸",
                    "radiance_fr014_yeting": "提灯的少女",
                    "radiance_fr015_xiuyin": "元素至尊",

                    "radiance_nh011_wawel": "炼狱巨龙",
                    "radiance_nh013_tianfa": "惩戒魔",
                    "radiance_000_infinity": "阐述者",
                },
                characterReplace: {
                    infinity: ["radiance_ma004_watersky", "radiance_ch004_watersky", "radiance_000_infinity"],
                    lotustar: ["radiance_fr001_lotustar", "radiance_fr001ft_lotustar", "radiance_fr001dk_lotustar"],
                    veronia: ["radiance_fr004_veronia", "radiance_hv004_veronia"],
                    luia: ["radiance_fr005_luia", "radiance_ma015_luia"],
                    reine: ["radiance_un004_reine", "radiance_hv001_reine"],
                },
                dynamicTranslate: {
                    "radiance_x": function(player) {
                        if (player.storage.txds_jizhao) {
                            return "出牌阶段对每名其他角色限<span class='bluetext'>两</span>次，你可以将至少一张牌交给其他角色。每回合限<span class='bluetext'>两</span>次，<span class='bluetext'>当你的牌被其他角色获得时</span>，你可以获得一张你选择的基本牌或摸两张牌。（每个牌名和摸牌各只能选择一次）";
                        }
                        return "出牌阶段对每名其他角色限一次，你可以将至少一张牌交给其他角色。每回合限一次，当你本回合有累计两张以上的牌被其他角色获得时，你可以获得一张你选择的基本牌或摸两张牌。";
                    },
                    "radiance_wanling": function(player) {
                        if (player.storage.radiance_cheli === true) return "摸牌阶段，你可以放弃摸牌，改为展示并获得牌堆顶三张牌，然后你根据这些牌的点数和获得以下技能直至回合结束：·不大于18：“灵药”；·不小于24：“万象”；<span class='bluetext'>·大于18且小于24：“质素”</span>。";
                        return "摸牌阶段，你可以放弃摸牌，改为展示并获得牌堆顶三张牌，然后你根据这些牌的点数和获得以下技能直至回合结束：·不大于18：“灵药”；·不小于24：“万象”。";
                    },
                    "radiance_diewu": function(player) {
                        if (player.storage.radiance_diewu) {
                            if (player.storage.radiance_diewu == 'female') return "一名<span class='bluetext'>女</span>性角色的出牌阶段开始时，你可以摸一张牌，然后其本回合使用【杀】的次数+1，手牌上限-1。"
                            if (player.storage.radiance_diewu == 'male') return "一名<span class='bluetext'>男</span>性角色的出牌阶段开始时，你可以摸一张牌，然后其本回合使用【杀】的次数+1，手牌上限-1。";
                        }
                        return "一名男性角色的出牌阶段开始时，你可以摸一张牌，然后其本回合使用【杀】的次数+1，手牌上限-1。";
                    },
                    "radiance_renlin": function(player) {
                        if (player.storage.radiance_renlin) {
                            return "游戏开始时，你可以随机使用一张武器牌。其他角色的武器牌进入弃牌堆后，你可以获得之。你的武器牌不计入手牌上限。<span style='opacity:0.5'>限定技，当一名角色进入濒死状态时，你可以重铸一张武器牌，然后该角色回复等量的体力。</span>";
                        }
                        return "游戏开始时，你可以随机使用一张武器牌。其他角色的武器牌进入弃牌堆后，你可以获得之。你的武器牌不计入手牌上限。限定技，当一名角色进入濒死状态时，你可以重铸任意张武器牌，然后该角色回复等量的体力";
                    },
                    "radiance_tenglong": function(player) {
                        if (player.storage.radiance_juesha === true) return "其他角色的出牌阶段开始时，你可以对该角色或其上下家使用一张【杀】。若如此做，你摸一张牌，其他角色与你计算距离时+1，直至回合结束。你使用【杀】时，<span class='bluetext'>所有其他角色的防具和非锁定技全部失效直至此【杀】结算完毕</span>。";
                        return "其他角色的出牌阶段开始时，你可以对该角色或其上下家使用一张【杀】。若如此做，你摸一张牌，其他角色与你计算距离时+1，直至回合结束。你使用【杀】时无视目标角色的防具。";
                    },
                    "radiance_yanzhen": function(player) {
                        if (player.storage.radiance_yanzhen) {
                            return "转换技，当一张非延时类锦囊牌被【无懈可击】响应后：·阴：你可以获得该锦囊牌；<span class='bluetext'>·阳：若你非此【无懈可击】的使用者，你可以获得此【无懈可击】。</span>你的非延时类锦囊牌不会被【无懈可击】响应。";
                        }
                        return "转换技，当一张非延时类锦囊牌被【无懈可击】响应后：<span class='bluetext'>·阴：你可以获得该锦囊牌；</span>·阳：若你非此【无懈可击】的使用者，你可以获得此【无懈可击】。你的非延时类锦囊牌不会被【无懈可击】响应。";
                    },
                },
            };
            game.addCharacterPack(radiance_pack, "星耀璨然");
        },
        precontent: function() {

        },
        help: {},
        config: {
            "radianceOnly": {
                name: '星耀限定',
                intro: "开启后，只能使用星耀璨然角色",
                init: false,
                onclick: function(item) {
                    game.saveConfig('extension_星耀璨然_radianceOnly', item);
                }
            },
            "radianceGroupChoose": {
                name: '选择势力',
                intro: "开启后，散、圣、冥势力的角色在游戏开始时选择变为一个其他势力",
                init: false,
                onclick: function(item) {
                    game.saveConfig('extension_星耀璨然_radianceGroupChoose', item);
                }
            },
            "radianceEnhanceZhu": {
                name: '主公强化',
                intro: "主公根据存活忠臣数获得额外的体力上限和摸牌阶段摸牌，不会被乐",
                init: false,
                onclick: function(item) {
                    game.saveConfig('extension_星耀璨然_radianceEnhanceZhu', item);
                }
            },
        },
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
                    // ggeneral
                    "radiance_zhu": {
                        trigger: {
                            global: 'dieAfter',
                            player: 'phaseDrawBegin1',
                        },
                        filter: function(event, player, name) {
                            if (name == 'dieAfter' && player.maxHp > 1) {
                                switch (player.identity) {
                                    case 'rZhu':
                                        return ['rZhong', 'bNei'].contains(event.player.identity);
                                        break;
                                    case 'bZhu':
                                        return ['bZhong', 'rNei'].contains(event.player.identity);
                                        break;
                                    default:
                                        return event.player.identity == 'zhong';
                                        break;
                                };
                            };
                            if (name == 'phaseDrawBegin1') return !event.numFixed;
                            return false;
                        },
                        forced: true,
                        charlotte: true,
                        fixed: true,
                        content: function() {
                            'step 0'
                            if (trigger.name == 'phaseDraw') {
                                trigger.num += (game.countPlayer(function(target) {
                                    switch (player.identity) {
                                        case 'rZhu':
                                            return ['rZhong', 'bNei'].contains(target.identity);
                                            break;
                                        case 'bZhu':
                                            return ['bZhong', 'rNei'].contains(target.identity);
                                            break;
                                        default:
                                            return target.identity == 'zhong';
                                            break;
                                    };
                                    return false;
                                }) > 0 ? 1 : 0);
                            } else {
                                player.loseMaxHp();
                            }
                        },
                        mod: {
                            targetEnabled: function(card, player, target) {
                                if (get.name(card) == 'lebu' && player != target) return false;
                            },
                        },
                        ai: {
                            threaten: function(viewer, player) {
                                if (player.hp <= 2) return;
                                var num = game.countPlayer(function(target) {
                                    switch (player.identity) {
                                        case 'rZhu':
                                            return ['rZhong', 'bNei'].contains(target.identity);
                                            break;
                                        case 'bZhu':
                                            return ['bZhong', 'rNei'].contains(target.identity);
                                            break;
                                        default:
                                            return target.identity == 'zhong';
                                            break;
                                    };
                                    return false;
                                });
                                return 0.6 / (1 + num);
                            },
                        }
                    },
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
                            var card = event.card;
                            var id = player.playerid;
                            var map = event.getParent().customArgs;
                            var need = 1;
                            if (get.tag(card, 'respondSha')) {
                                if (map[id] && typeof map[id].shaReq == 'number') need = map[id].shaReq;
                                if (player.countCards('h', {
                                        name: 'sha'
                                    }) < need) {
                                    return true;
                                };
                            } else if (get.tag(card, 'respondShan')) {
                                if (map[id] && typeof map[id].shanRequired == 'number') need = map[id].shanRequired;
                                if (player.countCards('h', {
                                        name: 'shan'
                                    }) < need) {
                                    return true;
                                };
                            } else if (get.tag(card, 'damage') && get.name(card) != 'huogong') {
                                return true;
                            };
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

                    // mmagic
                    "radiance_bofa": {
                        init: function(player) {
                            if (!player.storage.radiance_bofa) player.storage.radiance_bofa = [];
                        },
                        intro: {
                            content: 'cards',
                            onunmark: function(storage, player) {
                                if (storage && storage.length) {
                                    player.$throw(storage, 1000);
                                    game.cardsDiscard(storage);
                                    game.log(storage, '被置入了弃牌堆');
                                    storage.length = 0;
                                }
                            },
                        },
                        trigger: {
                            global: 'useCard2',
                        },
                        filter: function(event, player) {
                            if (player == event.player) return false;

                            var card = event.card;
                            if (get.type(card, 'trick') == 'equip') return false;
                            for (var i = 0; i < player.storage.radiance_bofa.length; i++) {
                                if (get.suit(event.card) == get.suit(player.storage.radiance_bofa[i])) return true;
                            }
                            return false;
                        },
                        direct: true,
                        locked: false,
                        content: function() {
                            'step 0'
                            player.chooseCardButton(player.storage.radiance_bofa, '选择一张与' + get.translation(trigger.card) + '花色相同的牌来取消该牌的所有目标', 1).set('filterButton', function(button) {
                                var card = button.link;
                                return get.suit(card) == get.suit(trigger.card);
                            }).set('ai', function(button) {
                                //if (trigger.getParent().excluded.contains(player)) return false;

                                var effect = 0;
                                if (trigger.card.name == 'wuxie' || trigger.card.name == 'shan') {
                                    if (get.attitude(player, trigger.player) < -1) {
                                        effect = -1;
                                    }
                                } else if (trigger.targets && trigger.targets.length) {
                                    for (var i = 0; i < trigger.targets.length; i++) {
                                        effect += get.effect(trigger.targets[i], trigger.card, trigger.player, player);
                                    }
                                }

                                var bool = false;
                                if (effect < 0) {
                                    if (player.storage.radiance_bofa.length && player.storage.radiance_bofa.length > 3) bool = true;
                                    if (trigger.card.name == 'sha') {
                                        if (trigger.targets.contains(player)) {
                                            if (player.countCards('h', 'shan') == 0) {
                                                bool = true;
                                            }
                                        } else {
                                            var target = trigger.targets[0];
                                            bool = (target.hp == 1 || (target.countCards('h') <= 2 && target.hp <= 2));
                                        }
                                    } else if (get.tag(trigger.card, 'respondSha')) {
                                        if (player.countCards('h', 'sha') == 0) {
                                            bool = true;
                                        }
                                    } else if (get.tag(trigger.card, 'respondShan')) {
                                        if (player.countCards('h', 'shan') == 0) {
                                            bool = true;
                                        }
                                    } else if (get.tag(trigger.card, 'damage')) {
                                        if (player.getDamagedHp() > 1) bool = true;
                                    } else if (get.name(trigger.card) == 'shunshou') {
                                        bool = true;
                                    } else if (get.tag(trigger.card, 'recover')) {
                                        bool = true;
                                    } else if (trigger.card.name == 'wuxie' || trigger.card.name == 'shan') {
                                        bool = true;
                                    }
                                }

                                if (!bool) return 0;

                                var val = get.value(button.link);
                                if (val < 0) return 100;
                                return 20 - val;
                            });
                            'step 1'
                            if (result.bool) {
                                player.logSkill('radiance_bofa');
                                game.log(player, '将', result.links, '置于弃牌堆');
                                player.$throw(result.links, 1000);
                                player.storage.radiance_bofa.remove(result.links[0]);
                                game.cardsDiscard(result.links[0]);
                                player.syncStorage('radiance_bofa');

                                if (player.storage.radiance_bofa.length < 1) {
                                    player.unmarkSkill('radiance_bofa');
                                } else {
                                    player.markSkill('radiance_bofa');
                                }

                                if (!event.isMine()) game.delayx();
                                trigger.targets = [];
                                trigger.triggeredTargets2 = [];
                                trigger.all_excluded = true;
                                game.delay();
                            }
                        },
                        ai: {
                            threaten: 0.6,
                        },
                        onremove: function(player) {
                            if (player.storage.radiance_bofa.length) {
                                player.$throw(player.storage.radiance_bofa, 1000);
                                game.log(player.storage.radiance_bofa, '被置入了弃牌堆');
                                game.cardsDiscard(player.storage.radiance_bofa);
                                player.storage.radiance_bofa = [];
                                player.unmarkSkill('radiance_bofa');
                            }
                        },
                        group: 'radiance_bofa_gain',
                        subfrequent: ['gain'],
                        subSkill: {
                            gain: {
                                trigger: {
                                    player: ['phaseZhunbeiBegin', 'damageAfter', 'loseHpAfter'],
                                },
                                frequent: true,
                                filter: function(event, player) {
                                    if (event.num === undefined) return true;
                                    return event.num > 0;
                                },
                                content: function() {
                                    'step 0'
                                    if (!player.storage.radiance_bofa) player.storage.radiance_bofa = [];
                                    if (player.storage.radiance_bofa.length < 5) {
                                        var card1 = get.cards(1);
                                        game.cardsGotoSpecial(card1);
                                        player.storage.radiance_bofa = player.storage.radiance_bofa.addArray(card1);
                                        player.$gain2(card1);
                                        player.syncStorage('radiance_bofa');
                                        player.markSkill('radiance_bofa');
                                        game.log(player, '将', card1, '置于武将牌上');
                                        game.delay();
                                    }
                                    if (player.countCards('h') > 0) {
                                        event.num = player.countCards('h');
                                    } else {
                                        event.finish();
                                    }
                                    'step 1'
                                    var next = player.chooseToMove('请选择保留' + get.cnNumber(event.num) + '张牌作为手牌');
                                    next.set('list', [
                                        ['「博法」牌', player.storage.radiance_bofa],
                                        ['手牌区', player.getCards('h')],
                                    ]);
                                    next.set('filterMove', function(from, to) {
                                        return typeof to != 'number';
                                    });
                                    next.set('processAI', function(list) {
                                        var player = _status.event.player,
                                            cards = list[0][1].concat(list[1][1]).sort(function(a, b) {
                                                return get.useful(a) - get.useful(b);
                                            }),
                                            cards2 = cards.splice(0, player.storage.radiance_bofa.length);
                                        return [cards2, cards];
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        var push = result.moved[0],
                                            gain = result.moved[1];
                                        push.removeArray(player.storage.radiance_bofa);
                                        gain.removeArray(player.getCards('h'));
                                        if (!push.length || push.length != gain.length) return;
                                        player.lose(push, ui.special, 'toStorage');
                                        game.log(player, '将', push, '置于武将牌上');
                                        player.gain(gain, 'gain2', 'log', 'fromStorage');
                                        player.storage.radiance_bofa.addArray(push);
                                        player.storage.radiance_bofa.removeArray(gain);
                                        player.markSkill('radiance_bofa');
                                    };
                                },
                            },
                        },
                    },
                    "radiance_xuehui": {
                        trigger: {
                            global: "loseHpAfter",
                        },
                        filter: function(event, player) {
                            if (!player.hasZhuSkill('radiance_xuehui', event.player) || player.hasSkill('radiance_xuehui_used')) return false;
                            if (event.num < 1 || !event.player.isIn()) return false;
                            return event.player != player && event.player.group == player.group;
                        },
                        zhuSkill: true,
                        direct: true,
                        content: function() {
                            'step 0'
                            trigger.player.chooseBool('学会：是否令' + get.translation(player) + '摸一张牌？').set('ai', function() {
                                return get.attitude(trigger.player, player) >= 1;
                            });
                            'step 1'
                            if (result.bool) {
                                trigger.player.logSkill('radiance_xuehui', player);
                                player.draw();
                                trigger.player.line(player);
                                trigger.player.addExpose(0.1);
                                trigger.player.popup('radiance_xuehui');
                                player.addTempSkill('radiance_xuehui_used');
                            }
                        },
                        subSkill: {
                            used: {
                                charlotte: true,
                            },
                        },
                    },
                    "radiance_tianyi": {
                        usable: 1,
                        enable: ['chooseToUse', 'chooseToRespond'],
                        filter: function(event, player) {
                            if (player.countCards('hes') > 1) return true;
                            return false;
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
                                    } else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                                    else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                                }
                                if (list.length == 0) {
                                    return ui.create.dialog('天仪没有可用牌');
                                }
                                return ui.create.dialog('天仪', [list, 'vcard']);
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
                                var name = button.link[2];

                                if (player.countCards('hs', button.link[2]) > 0) return 0;
                                if (name == 'wugu') return 0;

                                var evt = _status.event.getParent('chooseToUse');
                                if (evt && evt.type == 'dying') {
                                    if (evt.dying != player && get.effect(evt.dying, {
                                            name: name
                                        }, player, player) <= 0) return 0;
                                    if (evt.dying == player && name == 'jiu') return 2.1;
                                    return 2;
                                }

                                var effect = player.getUseValue(button.link[2]);
                                if (effect > 0 && player.countCards('hes', function(card) {
                                        return player.getUseValue(card) < effect;
                                    }) > 1) return effect;
                                return 0;
                            },
                            backup: function(links, player) {
                                return {
                                    filterCard: function(card, player) {
                                        return true;
                                    },
                                    selectCard: 2,
                                    popname: true,
                                    check: function(card) {
                                        return 9.1 - get.value(card);
                                    },
                                    position: 'hes',
                                    viewAs: {
                                        name: links[0][2],
                                        nature: links[0][3]
                                    },
                                    onuse: function(result, player) {
                                        player.logSkill('radiance_tianyi');
                                    },
                                    onrespond: function(result, player) {
                                        player.logSkill('radiance_tianyi');
                                    },
                                }
                            },
                            prompt: function(links, player) {
                                return '将一张非基本牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用或打出';
                            }
                        },
                        hiddenCard: function(player, name) {
                            if (player.countCards('hes') < 2) return false;
                            var num = player.getStat().skill.radiance_tianyi;
                            if (!num) return name == 'wuxie';
                        },
                        ai: {
                            save: true,
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function(player) {
                                if (player.countCards('hes') < 2) return false;
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

                    },
                    "radiance_pofa": {
                        trigger: {
                            target: 'useCardToTarget',
                        },
                        intro: {
                            content: '还能获得#张锦囊',
                        },
                        filter: function(event, player) {
                            if (player == event.player) return false;
                            if (player.hp < 1) return false;

                            var card = event.card;
                            if (get.type(card, 'trick') == 'trick') return true;
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
                            player.addTempSkill('radiance_pofa_af');
                            player.storage.radiance_pofa = 3;
                            'step 1'
                            if (!event.isMine()) game.delayx();
                            trigger.getParent().targets.remove(player);
                            trigger.getParent().triggeredTargets2.remove(player);
                            game.delay();
                        },
                        ai: {
                            threaten: 0.6,
                        },
                        action_tag: {
                            overall: 4,
                            loseHp_defend: true,
                            reuse: 2,
                        }
                    },
                    "radiance_pofa_af": {
                        trigger: {
                            global: ["loseAfter", "cardsDiscardAfter"],
                        },
                        forced: true,
                        charlotte: true,
                        filter: function(event, player) {
                            if (player.countMark('radiance_pofa') < 1) return false;

                            var cards = (event.cards2 || event.cards);
                            if (!cards) return false;
                            if (event.name == 'lose') {
                                if (event.type != 'discard' || event.player == player) return false;
                            } else {
                                var evt = event.getParent();
                                if (evt.name != 'orderingDiscard' || !evt.relatedEvent || evt.relatedEvent.player == player) return false;
                            };

                            for (var i = 0; i < cards.length; i++) {
                                if (get.type(cards[i], 'trick') == 'trick' && (get.position(cards[i], true) == 'd')) return true;
                            };
                            return false;
                        },
                        onremove: function(player, storage) {
                            player.removeMark('radiance_pofa', 9);
                        },
                        content: function() {
                            'step 0'
                            event.cards = [];
                            var cards = trigger.cards2 || trigger.cards;
                            for (var i = 0; i < cards.length; i++) {
                                if (get.type(cards[i], 'trick') == 'trick' && get.position(cards[i], true) == 'd') {
                                    event.cards.push(cards[i]);
                                    player.removeMark('radiance_pofa', 1);
                                    if (player.countMark('radiance_pofa') == 0) break;
                                };
                            };
                            'step 1'
                            player.gain(event.cards, 'gain2', 'log');
                        },
                        mod: {
                            targetEnabled: function(card, player, target) {
                                if ((get.type2(card) == 'trick') && player != target) return false;
                            },
                        },
                    },
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
                            var num = Math.max(player.getDamagedHp(), 1);
                            var cards = get.cards(num);
                            event.cards = cards;
                            game.cardsGotoOrdering(cards);
                            var dialog = ui.create.dialog("质素");
                            dialog.add("请选择要获得的牌，没获得的点数为1或质数的牌可以造成伤害");
                            dialog.add(cards);
                            player.chooseButton(dialog, [1, cards.length]).set('ai', function(button) {
                                var card = button.link;
                                var player = _status.event.player;
                                if (get.value(card, player, 'raw') < 0) return -1;
                                var damage = 0;
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i] == player) continue;
                                    damage = Math.max(damage, get.damageEffect(game.players[i], player, player));
                                };
                                if (lib.watersky.func.isPrime(get.number(card), true)) {
                                    return player.getUseValue(card) + 0.01 - Math.max(0, damage);
                                };
                                return get.value(card) + 0.01;
                            });
                            'step 1'
                            if (result.bool && result.links.length > 0) {
                                var togain = [];
                                for (var i = 0; i < result.links.length; i++) {
                                    event.cards.remove(result.links[i]);
                                    togain.push(result.links[i]);
                                }
                                player.gain(togain, 'draw2');
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
                                player.showCards(cards, "未获得的牌中点数为1或质数的牌");
                                player.line(result.targets[0], 'blue');
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
                                    if (!player.isDamaged()) return Math.max(check, eff2);
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
                    "radiance_aofa": {
                        trigger: {
                            player: 'useCard',
                            target: 'useCardToTargeted',
                        },
                        usable: 1,
                        filter: function(event, player) {
                            if (player.hasSkill('radiance_aofa_db')) return false;
                            if (event.name == 'useCard') return true;
                            return get.tag(event.card, 'damage');
                        },
                        prompt2: function(event, player) {
                            var num = 1;
                            if (Array.isArray(player.storage.radiance_jingyao_af) && player.storage.radiance_jingyao_af.length > 0) num += 1;
                            if (event.name == 'useCard') return '使用了牌，是否摸' + get.cnNumber(num) + '张牌？';
                            num += 1;
                            return '成为了' + get.translation(event.card) + '的目标，是否摸' + get.cnNumber(num) + '张牌？';
                        },
                        content: function() {
                            'step 0'
                            var num = 1;
                            if (trigger.name != 'useCard') num += 1;
                            if (Array.isArray(player.storage.radiance_jingyao_af) && player.storage.radiance_jingyao_af.length > 0) num += 1;
                            player.draw(num);
                            'step 1'
                            if (player != _status.currentPhase && trigger.name != 'useCard') {
                                player.addTempSkill('radiance_aofa_db');
                                trigger.radiance_aofa = true;
                            }
                        },
                        ai: {
                            effect: {
                                target: function(card, player, target) {
                                    if (get.tag(card, 'damage')) {
                                        if (target.hasSkill('radiance_aofa_db') && target.countCards('h') > 0) return [2, -2];
                                        if (Array.isArray(target.storage.radiance_jingyao) && target.storage.radiance_jingyao.length > 0) {
                                            return 0;
                                        }
                                        return 0.7;
                                    }
                                },
                            },
                        },
                        action_tag: {
                            overall: 5,
                            draw: 2,
                            deterrence: 0.5,
                        },
                    },
                    "radiance_aofa_db": {
                        trigger: {
                            target: 'useCardToTargeted',
                        },
                        forced: true,
                        silent: true,
                        charlotte: true,
                        filter: function(event, player) {
                            if (event.radiance_aofa || event.player == player) return false;
                            return player.countCards('h') > player.hp;
                        },
                        content: function() {
                            player.chooseToDiscard(1, 'h', true);
                        },
                        ai: {
                            neg: true,
                            threaten: 8,
                        }
                    },
                    "radiance_jingyao": {
                        unique: true,
                        enable: 'phaseUse',
                        animationColor: 'metal',
                        skillAnimation: true,
                        limited: true,
                        filterCard: function(card) {
                            return true;
                        },
                        selectCard: [1, 2],
                        discard: false,
                        lose: false,
                        delay: 0,
                        mark: false,
                        check: function(card) {
                            return 10 - get.value(card);
                        },
                        init: function(player) {
                            player.storage.radiance_jingyao = false;
                        },
                        content: function() {
                            'step 0'
                            player.awakenSkill('radiance_jingyao', true);
                            'step 1'
                            player.addSkill('radiance_jingyao_af');
                            'step 2'
                            player.lose(cards, ui.special, 'toStorage');
                            player.storage.radiance_jingyao_af.addArray(cards);
                            player.syncStorage('radiance_jingyao_af');
                            player.markSkill('radiance_jingyao_af');
                            game.log(player, '将', cards, '置于武将牌上');
                        },
                        ai: {
                            order: 15,
                            result: {
                                player: function(player) {
                                    return 10;
                                }
                            }
                        },
                        action_tag: {
                            combo: 1,
                            limited: 1,
                        },
                    },
                    "radiance_jingyao_af": {
                        trigger: {
                            player: 'phaseZhunbeiBegin'
                        },
                        charlotte: true,
                        forced: true,
                        filter: function(event, player) {
                            return (Array.isArray(player.storage.radiance_jingyao_af) && player.storage.radiance_jingyao_af.length > 0);
                        },
                        content: function() {
                            'step 0'
                            var cards = player.storage.radiance_jingyao_af;
                            var card = cards.randomGet();
                            player.$throw(card, 1000);
                            player.storage.radiance_jingyao_af.remove(card);
                            game.cardsDiscard(card);
                            player.syncStorage('radiance_jingyao_af');
                            'step 1'
                            if (player.storage.radiance_jingyao_af.length < 1) {
                                player.unmarkSkill('radiance_jingyao_af');
                                player.removeSkill('radiance_jingyao_af');
                            } else {
                                player.markSkill('radiance_jingyao_af');
                            }
                        },
                        intro: {
                            content: 'cards',
                            onunmark: function(storage, player) {
                                if (storage && storage.length) {
                                    player.$throw(storage, 1000);
                                    game.cardsDiscard(storage);
                                    game.log(storage, '被置入了弃牌堆');
                                    storage.length = 0;
                                }
                            },
                        },
                        init: function(player, skill) {
                            if (!Array.isArray(player.storage.radiance_jingyao_af)) player.storage.radiance_jingyao_af = [];
                        },
                        onremove: function(player) {
                            if (player.storage.radiance_jingyao_af.length) {
                                game.log(player.storage.radiance_jingyao_af, '被置入了弃牌堆');
                                game.cardsDiscard(player.storage.radiance_jingyao_af);
                                player.storage.radiance_jingyao_af = [];
                                player.unmarkSkill('radiance_jingyao_af');
                            }
                        },
                    },

                    "radiance_lingyao": {
                        enable: 'phaseUse',
                        usable: 1,
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        filterTarget: lib.filter.notMe,
                        filterCard: true,
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
                            var info = get.info(event.card);
                            var str = "选择使用" + get.translation(event.card) + "的目标并令" + get.translation(player) + "摸一张牌，或者失去一点体力且不能使用牌";
                            if (info.notarget || !info.filterTarget || !info.selectTarget || get.type(event.card) == 'equip' || !game.hasPlayer(function(current) {
                                    if (current == player || current == target) return false;
                                    return target.canUse(card, current);
                                })) {
                                event._result = {
                                    bool: false,
                                    targets: [],
                                };
                            } else {
                                var select = info.selectTarget;
                                if (Array.isArray(select)) {
                                    if (select.length > 2 || select.length === 0) {
                                        select = false;
                                        event._result = {
                                            bool: false,
                                            targets: [],
                                        };
                                    } else if (select.length == 1) {
                                        select = select[0];
                                    }
                                }
                                if (typeof select === 'number') {
                                    if (select > 0) {
                                        select = [select, select];
                                    } else if (select == -1) {
                                        select = [-1, -1];
                                    } else {
                                        select = false;
                                        event._result = {
                                            bool: false,
                                            targets: [],
                                        };
                                    }
                                }
                                if (select) {
                                    target.chooseToUse().set('source', player).set('prompt', str).set('filterTarget', function(card, player, target) {
                                        if (target == _status.event.source || target == _status.event.player) return false;
                                        return _status.event.player.canUse(_status.event.getParent().card, target, true);
                                    }).set('filterCard', function(card) {
                                        return card == _status.event.getParent().card;
                                    });
                                };
                            }
                            'step 2'
                            if (result.bool && result.targets.length) {
                                player.chooseDrawRecover(2, 1);
                                event.finish();
                            } else {
                                target.addTempSkill('radiance_forbid');
                            };
                            'step 3'
                            target.loseHp();
                            game.delay();
                        },
                        ai: {
                            order: function(item, player) {
                                return 9;
                                var hs = player.getCards('h');
                                for (var i = 0; i < hs.length; i++) {
                                    var card = hs[i];
                                    var info = get.info(card);
                                    if (info.notarget || !info.filterTarget || !info.selectTarget || get.type(card) == 'equip') {
                                        if (get.value(card) < 6.1) return 10;
                                    } else if (info.selectTarget == -1) {
                                        return game.hasPlayer(function(current) {
                                            if (current == player) return false;
                                            var eff = 0;
                                            game.countPlayer(function(current2) {
                                                if (current2 != player && current2 != current && current.canUse(card, current2)) eff += get.effect(current2, card, current, player);
                                            });
                                            if (eff > 0 || get.value(card) < 4.1) return Math.min(eff, 9);
                                        })
                                    } else if (game.hasPlayer(function(current) {
                                            if (current == player) return false;
                                            return game.hasPlayer(function(current2) {
                                                return current2 != current && current2 != player && current.canUse(card, current2) && get.effect(current2, card, current, player) > 0
                                            })
                                        })) {
                                        return 6;
                                    } else if (get.value(card) < 3) {
                                        return 4;
                                    }
                                }
                                return 1;
                            },
                            result: {
                                target: function(player, target) {
                                    var card = ui.selected.cards[0];
                                    if (!card) return 0;

                                    var info = get.info(card);
                                    if (info.notarget || !info.filterTarget || !info.selectTarget || get.type(card, target) == 'equip' || !game.hasPlayer(function(current) {
                                            if (current == player || current == target) return false;
                                            return target.canUse(card, current);
                                        })) {
                                        if (get.value(card) < 6.1) return -10;
                                    } else if (info.selectTarget == -1) {
                                        var eff1 = 0,
                                            eff2 = 0;
                                        game.countPlayer(function(current) {
                                            if (current != player && current != target && target.canUse(card, current)) {
                                                eff1 += get.effect(current, card, target, player);
                                                eff2 += get.effect(current, card, target, target);
                                            };
                                        });
                                        if (eff1 > 0) return eff1;
                                        if (eff2 < 0 && get.value(card) < 4.1) return eff2;
                                        return 0;
                                    } else if (game.hasPlayer(function(current) {
                                            return current != player && current != target && target.canUse(card, current) && get.effect(current, card, target, player) > 0;
                                        })) {
                                        return 1.5;
                                    } else if (!game.hasPlayer(function(current) {
                                            return current != player && current != target && target.canUse(card, current);
                                        })) {
                                        return -10;
                                    };
                                    if (get.value(card, player) < 3 && get.value(card, target) < 3) {
                                        return -1;
                                    };
                                    return 0;
                                },
                            },
                        },
                        action_tag: {
                            overall: 3.6,
                            draw: 1,
                            loseHp: 1,
                            forbid: 1,
                        },
                    },
                    "radiance_mingyong": {
                        trigger: {
                            player: "damageBefore",
                        },
                        filter: function(event, player) {
                            return event.num > 0;
                        },
                        forced: true,
                        priority: 30,
                        content: function() {
                            'step 0'
                            trigger.cancel();
                            'step 1'
                            player.loseHp();
                        },
                        group: ["radiance_mingyong_discard"],
                        action_tag: {
                            overall: 5,
                            loseHp_defend: 1,
                            discard: 2,
                            draw: 0.5,
                        },
                        subSkill: {
                            discard: {
                                trigger: {
                                    player: "loseHpAfter",
                                },
                                direct: true,
                                sub: true,
                                filter: function(event, player) {
                                    return event.num > 0;
                                },
                                content: function() {
                                    'step 0'
                                    event.target = _status.currentPhase;
                                    if (event.target == player || !event.target.isIn() || event.target.countCards('h') == 0) {
                                        event.goto(3);
                                    };
                                    'step 1'
                                    var chooseButton = player.chooseButton([1, 3], ["弃置" + get.translation(event.target) + '的手牌', event.target.getCards('h')]);
                                    chooseButton.set('target', event.target);
                                    chooseButton.set('ai', function(button) {
                                        var player = _status.event.player;
                                        if (get.attitude(player, _status.event.target) > 0) return 0;
                                        return get.value(button.link) || 1;
                                    });
                                    chooseButton.set('filterButton', function(button) {
                                        if (ui.selected.buttons.length < 1) return true;
                                        return get.suit(button.link) == get.suit(ui.selected.buttons[0]);
                                    });
                                    'step 2'
                                    if (result.bool && result.links.length > 0) {
                                        player.logSkill('radiance_mingyong', target);
                                        event.target.showHandcards();
                                        target.discard(result.links).set('source', player);
                                        if (player.countCards('h', {
                                                suit: get.suit(result.links[0])
                                            }) == 0) {
                                            event.suits = [get.suit(result.links[0])];
                                            // event.goto(5);
                                        };
                                    };
                                    event.finish();
                                    'step 3'
                                    var suits = ['spade', 'heart', 'club', 'diamond'];
                                    var hs = player.getCards('h');
                                    for (var i = 0; i < hs.length; i++) {
                                        suits.remove(get.suit(hs[i]));
                                    };
                                    if (suits.length == 0) {
                                        event.finish();
                                    } else {
                                        event.suits = suits;
                                        player.chooseBool("是否获得" + (suits.length > 1 ? get.translation(suits) + "的牌各一张？" : "一张" + get.translation(suits) + "牌？")).set('choice', true);
                                    };
                                    'step 4'
                                    if (result.bool) {
                                        player.logSkill('radiance_mingyong');
                                        player.showHandcards();
                                    } else {
                                        event.finish();
                                    };
                                    'step 5'
                                    var togain = [];
                                    for (var i = 0; i < event.suits.length; i++) {
                                        var card = get.cardPile(function(cardx) {
                                            return get.suit(cardx) == event.suits[i];
                                        });
                                        if (card) togain.push(card);
                                    };
                                    if (togain.length) player.gain(togain, 'gain2');
                                },
                            },
                        },
                        ai: {
                            threaten: 0.6,
                        },
                    },
                    "radiance_yingcai": {
                        trigger: {
                            player: 'phaseDrawBegin2'
                        },
                        forced: true,
                        filter: function(event, player) {
                            return !event.numFixed;
                        },
                        content: function() {
                            trigger.num += 1;
                        },
                        mod: {
                            attackFrom: function(from, to, current) {
                                return current - 1;
                            },
                            maxHandcard: function(player, num) {
                                return num + 1;
                            },
                        },
                        action_tag: {
                            overall: 2.5,
                            draw: 1,
                            maxHand: 1,
                            range: 1,
                        }
                    },
                    "radiance_tulong": {
                        unique: true,
                        enable: 'phaseUse',
                        mark: true,
                        skillAnimation: 'epic',
                        limited: true,
                        animationColor: 'soil',
                        intro: {
                            content: 'limited'
                        },
                        init: function(player) {
                            if (typeof player.storage.radiance_tulong != 'boolean') player.storage.radiance_tulong = false;
                        },
                        filter: function(event, player) {
                            return (!player.storage.radiance_tulong);
                        },
                        content: function() {
                            'step 0'
                            event.num = game.roundNumber;
                            player.awakenSkill('radiance_tulong');
                            player.addTempSkill('radiance_tulong_af', 'phaseEnd');
                            'step 1'
                            if (event.num > 0) {
                                player.gain(get.cardPile(function(card) {
                                    return get.name(card) == 'sha';
                                }), 'gain2');
                                event.num--;
                                event.redo();
                            }
                        },
                        ai: {
                            threaten: 4,
                            order: 10,
                            result: {
                                player: function(player) {
                                    if (player.hp < 2 || game.roundNumber < 2 || player.getUseValue('sha') < 1) return 0;
                                    return 10;
                                },
                            },
                        },
                    },
                    "radiance_tulong_af": {
                        trigger: {
                            player: 'useCardToPlayered',
                        },
                        filter: function(event) {
                            return event.card.name == 'sha';
                        },
                        forced: true,
                        silent: true,
                        content: function() {
                            var id = trigger.target.playerid;
                            var map = trigger.getParent().customArgs;
                            if (!map[id]) map[id] = {};
                            if (typeof map[id].shanRequired == 'number') {
                                map[id].shanRequired += 1;
                            } else {
                                map[id].shanRequired = 2;
                            }
                        },
                        ai: {
                            unequip_ai: true,
                            unequip: true,
                            skillTagFilter: function(player, tag, arg) {
                                if (arg && arg.name == 'sha') return true;
                                return false;
                            }
                        },
                        mod: {
                            cardUsable: function(card, player, num) {
                                if (card.name == 'sha') return Infinity;
                            }
                        },
                        onremove: function(player, skill) {
                            player.loseHp();
                        },
                    },
                    "radiance_fengdong": {
                        trigger: {
                            player: 'phaseZhunbeiBegin',
                        },
                        filter: function(event, player) {
                            return game.countPlayer(function(current) {
                                return current != player && current.countCards('h') > 0;
                            }) > 0;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseTarget("封冻：选择一个目标", 1, function(card, player, target) {
                                return target != player && target.countCards('h') > 0;
                            }).set('ai', function(target) {
                                return target.countCards('h');
                            });
                            'step 1'
                            if (result.bool && result.targets.length) {
                                event.target = result.targets[0];
                                player.logSkill('radiance_fengdong', event.target);
                                player.line(event.target);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            event.target.showHandcards();
                            var hs = event.target.getCards('h');
                            player.chooseButton(1, true, ["封冻：请选择一个花色的牌", hs]).set('ai', function(button) {
                                var card = button.link;
                                var count = 0;
                                for (var i = 0; i < _status.event.cards.length; i++) {
                                    if (get.suit(card) == get.suit(_status.event.cards[i])) count++;
                                };
                                return count;
                            }).set('cards', hs);
                            'step 3'
                            event.suit = get.suit(result.links[0]);
                            event.count = event.target.countCards('h', {
                                suit: event.suit
                            });
                            game.log(player, "选择了", event.suit, "牌");
                            player.popup(event.suit);
                            event.videoId = lib.status.videoId++;
                            var func = function(id, list) {
                                var choiceList = ui.create.dialog('封冻：请选择要执行的选项');
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
                            event.str1 = "摸" + get.cnNumber(event.count) + "张牌";
                            event.str2 = "令该角色非" + get.translation(event.suit) + "花色的牌不能使用或打出";

                            event.dialog = func(event.videoId, [event.str1, event.str2]);
                            if (player != game.me || _status.auto) {
                                event.dialog.style.display = 'none';
                            }
                            var next = player.chooseButton();
                            next.set('dialog', event.videoId);
                            next.set('selectButton', [1, 2]);
                            next.set('forced', true);
                            next.set('ai', function(button) {
                                if (button.link == 0) return 1;
                                return 0;
                            });
                            'step 4'
                            event.dialog.close();
                            event.bool1 = false;
                            event.bool2 = false;
                            if (result.bool) {
                                for (var i = 0; i < result.links.length; i++) {
                                    var index = result.links[i] + 1;
                                    event['bool' + index] = true;
                                }
                            } else {
                                event.finish();
                            }
                            'step 5'
                            if (event.bool1 && event.bool2) {
                                game.log(player, "同时选择了摸牌和封印效果");
                                player.draw(event.count);
                                event.target.storage.radiance_fengdong_forbid = event.suit;
                                event.target.addTempSkill('radiance_fengdong_forbid');
                            } else if (event.bool1) {
                                game.log(player, "选择了摸牌");
                                player.draw(event.count);
                            } else if (event.bool2) {
                                game.log(player, "选择了封印");
                                event.target.storage.radiance_fengdong_forbid = event.suit;
                                event.target.addTempSkill('radiance_fengdong_forbid');
                            }
                            'step 6'
                            if (event.bool1 && event.bool2) {
                                player.loseHp();
                            };
                        },
                    },
                    "radiance_fengdong_forbid": {
                        trigger: {
                            player: 'damageBegin3',
                        },
                        forced: true,
                        locked: true,
                        charlotte: true,
                        debuff: true,
                        filter: function(event, player) {
                            return event.num > 0 && event.card && get.suit(event.card, event.source || player) == player.storage.radiance_fengdong_forbid;
                        },
                        content: function() {
                            trigger.num++;
                        },
                        mark: true,
                        marktext: "冻",
                        intro: {
                            mark: function(dialog, content, player) {
                                return '只能使用或打出' + get.translation(player.storage.radiance_fengdong_forbid) + '牌';
                            },
                        },
                        mod: {
                            cardEnabled2: function(card, player) {
                                if (player.storage.radiance_fengdong_forbid != get.suit(card)) {
                                    return false;
                                }
                            },
                        },
                        onremove: function(player) {
                            delete player.storage.radiance_fengdong_forbid;
                        },
                        ai: {
                            effect: {
                                target: function(card, player, target, current) {
                                    if (get.tag(card, 'damage') && get.suit(card, player) == target.storage.radiance_fengdong_forbid) return 2;
                                },
                            },
                        },
                    },
                    "radiance_jingti": {
                        trigger: {
                            player: 'damageBefore',
                        },
                        filter: function(event, player) {
                            var ds = player.getHistory('damage', function(evt) {
                                return true;
                            });
                            if (ds.length > 0) return false;
                            return (!event.nature && !player.getEquip(2) && event.num > 0);
                        },
                        forced: true,
                        usable: 1,
                        content: function() {
                            trigger.cancel();
                        },
                        ai: {
                            effect: {
                                target: function(card, player, target, current) {
                                    if (target.getHistory('damage').length > 0) return;
                                    if (target.getStat('skill').radiance_jingti) return;
                                    if (get.tag(card, 'damage')) {
                                        if (get.nature(card, player) && get.nature(card, player) != 'none') return 1.5;
                                        if (get.attitude(target, player) >= 0 && get.attitude(player, target) >= 0) {
                                            return 0;
                                        } else {
                                            var bs = player.getCards('h', function(card2) {
                                                return card != card2 && get.tag(card2, 'damage') && player.canUse(card, target, true);
                                            });
                                            if (bs.length < 1) return 0;
                                            return [1, 0, 1, -0.5];
                                        };
                                    };
                                },
                            },
                        },
                        action_tag: {
                            overall: 3,
                            direct_defend: 1,
                            damage_prevent: 1,
                        },
                    },
                    "radiance_heidong": {
                        enable: 'phaseUse',
                        usable: 1,
                        skillAnimation: 'epic',
                        animationColor: 'thunder',
                        filterTarget: function(card, player, target) {
                            return target != player;
                        },
                        selectTarget: -1,
                        content: function() {
                            'step 0'
                            target.damage();
                            'step 1'
                            if (target.isIn()) {
                                target.discardPlayerCard("是否弃置" + get.translation(player) + "的一张牌？", player, 'he', 1);
                            };
                        },
                        ai: {
                            threaten: 4,
                            order: 1,
                            result: {
                                player: function(player) {
                                    return 0 - Math.min(player.countCards('he') / 2, 1);

                                    var friends = game.countPlayer(function(current) {
                                        return current != player && get.attitude(player, current) > 0 && current.hp > 2;
                                    });
                                    var friends_danger = game.countPlayer(function(current) {
                                        return current != player && get.attitude(player, current) > 0 && current.hp < 3;
                                    });
                                    var enemies = game.countPlayer(function(current) {
                                        return current != player && get.attitude(player, current) < 0 && current.hp > 2;
                                    });
                                    var enemies_danger = game.countPlayer(function(current) {
                                        return current != player && get.attitude(player, current) < 0 && current.hp < 3;
                                    });

                                    return enemies_danger * 3 + enemies * 1.5 - friends_danger * 2 - friends * 1.5;
                                },
                                target: function(player, target) {
                                    var eff = get.damageEffect(target, player, player);
                                    if (target.hasSkillTag('nodamage')) return 0;
                                    return 0 - Math.abs(eff);
                                },
                            },
                        },
                    },
                    "radiance_xuling": {
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
                            var card = event.card;
                            var id = player.playerid;
                            var map = event.getParent().customArgs;
                            var need = 1;
                            if (get.tag(card, 'respondSha')) {
                                if (map[id] && typeof map[id].shaReq == 'number') need = map[id].shaReq;
                                if (player.countCards('h', {
                                        name: 'sha'
                                    }) < need) {
                                    return true;
                                };
                            } else if (get.tag(card, 'respondShan')) {
                                if (map[id] && typeof map[id].shanRequired == 'number') need = map[id].shanRequired;
                                if (player.countCards('h', {
                                        name: 'shan'
                                    }) < need) {
                                    return true;
                                };
                            } else if (get.tag(card, 'damage') && get.name(card) != 'huogong') {
                                return true;
                            };
                            return false;
                        },
                        content: function() {
                            'step 0'
                            player.loseHp(1);
                            'step 1'
                            trigger.getParent().excluded.add(player);
                            game.delay();
                            'step 2'
                            player.chooseTarget(1, get.prompt2('radiance_xuling'), function(card, player, target) {
                                return target.hp != target.countCards('h');
                            }).set('ai', function(target) {
                                var base = 1;
                                if (target == player) {
                                    base = target.hp > target.countCards('h') ? 2.1 : 0;
                                } else if (target.countCards('h') < target.hp) {
                                    base = 2 / target.hp;
                                } else {
                                    base = -4 / (Math.max(target.hp, 0.5) * target.countCards('h'));
                                };
                                var num = target.countCards('h') - target.hp;
                                return base * get.attitude(player, target);
                            });
                            'step 3'
                            if (result.bool && result.targets.length) {
                                var target = result.targets[0];
                                player.line(target, 'red');
                                game.log('radiance_xuling', player, "选择令", target, (target.countCards('h') < target.hp ? "摸牌" : "弃牌"));
                                if (target.countCards('h') < target.hp) {
                                    target.draw(2);
                                } else {
                                    target.chooseToDiscard(2, 'h', true);
                                };
                            };
                        },
                        ai: {
                            threaten: function(viewer, player) {
                                if (player.countCards('h') < player.hp - 1) return 0.7;
                            },
                        },
                    },
                    "radiance_mojian": {
                        mod: {
                            attackFrom: function(from, to, current) {
                                return current - 5;
                            },
                        },
                        locked: true,
                        ai: {
                            unequip: true,
                            unequip_ai: true,
                            skillTagFilter: function(player, tag, arg) {
                                if (tag == 'unequip_ai' || tag == 'unequip') {
                                    if (arg && arg.name == 'sha') return true;
                                    return false;
                                };
                            },
                        },
                    },
                    "radiance_guanduan": {
                        init: function(player) {
                            if (player.storage.radiance_guanduan) return;
                            player.storage.radiance_guanduan = {
                                "hand": [function(player, target) {
                                    return target.countCards('h') <= player.countCards('h');
                                }, "手牌数不大于你"],
                                "hp": [function(player, target) {
                                    return target.hp <= player.hp;
                                }, "体力值不大于你"],
                                "equip": [function(player, target) {
                                    return target.countCards('e') <= player.countCards('e');
                                }, "装备区的牌数不大于你"],
                            };
                        },
                        intro: {
                            mark: function(dialog, content, player) {
                                var count = 0;
                                var str = "当前可以使用的条件：";
                                for (var i in player.storage.radiance_guanduan) {
                                    str += "·" + player.storage.radiance_guanduan[i][1] + " ";
                                    count++;
                                };
                                if (count == 0) return "“贯断”没有可以使用的条件";
                                return str.substring(0, str.length - 1);
                            },
                        },
                        mark: true,
                        marktext: "贯",
                        trigger: {
                            player: 'useCardToTargeted'
                        },
                        logTarget: 'target',
                        check: function(event, player) {
                            return get.attitude(player, event.target) < 0;
                        },
                        prompt2: function(event, player) {
                            var num = 0;
                            for (var i in player.storage.radiance_guanduan) {
                                if (player.storage.radiance_guanduan[i][0](player, event.target)) {
                                    num++;
                                };
                            };
                            var str = "令" + get.translation(event.target);
                            if (num > 0) {
                                str += "需要额外使用一张【闪】响应此【杀】";
                            }
                            if (num > 1) {
                                str += "，非锁定技失效";
                            }
                            if (num > 2) {
                                str += "，弃置一张牌";
                            }
                            return str;
                        },
                        filter: function(event, player) {
                            if (event.card.name != 'sha') return false;
                            for (var i in player.storage.radiance_guanduan) {
                                if (player.storage.radiance_guanduan[i][0](player, event.target)) {
                                    return true;
                                }
                            }
                            return false;
                        },
                        content: function() {
                            var num = 0;
                            for (var i in player.storage.radiance_guanduan) {
                                if (player.storage.radiance_guanduan[i][0](player, trigger.target)) {
                                    num++;
                                };
                            };
                            game.log(trigger.target, "满足了" + get.cnNumber(num), "项");

                            if (num > 0) {
                                var id = trigger.target.playerid;
                                var map = trigger.getParent().customArgs;
                                if (!map[id]) map[id] = {};
                                if (typeof map[id].shanRequired == 'number') {
                                    map[id].shanRequired += 1;
                                } else {
                                    map[id].shanRequired = 2;
                                }
                            };
                            if (num > 1) {
                                if (!trigger.target.hasSkill('fengyin')) {
                                    trigger.target.addTempSkill('fengyin');
                                }
                            };
                            if (num > 2) {
                                trigger.target.chooseToDiscard(1, 'he', true);
                            };
                        },
                    },
                    "radiance_cangkong": {
                        enable: "phaseUse",
                        usable: 1,
                        filter: function(event, player) {
                            if (!player.storage.radiance_guanduan) return false;
                            var count = 0;
                            for (var i in player.storage.radiance_guanduan) {
                                count++;
                            };
                            return count > 0 || player.maxHp > 1;
                        },
                        chooseButton: {
                            dialog: function(event, player) {
                                var choiceList = ui.create.dialog('苍空：请选择一项', 'forcebutton', 'hidden');
                                for (var i in player.storage.radiance_guanduan) {
                                    var str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                                    str += player.storage.radiance_guanduan[i][1];
                                    str += '</div>';
                                    var next = choiceList.add(str);
                                    next.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                                    next.firstChild.link = i;
                                    for (var j in lib.element.button) {
                                        next[j] = lib.element.button[i];
                                    }
                                    choiceList.buttons.add(next.firstChild);
                                };
                                if (player.maxHp > 1) {
                                    var str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                                    str += "体力上限";
                                    str += '</div>';
                                    var next = choiceList.add(str);
                                    next.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                                    next.firstChild.link = 'maxHp';
                                    for (var j in lib.element.button) {
                                        next[j] = lib.element.button[i];
                                    }
                                    choiceList.buttons.add(next.firstChild);
                                };
                                return choiceList;
                            },
                            filter: function(button, player) {
                                if (button.link == 'maxHp' && player.maxHp <= 1) return false;
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i].isOut() || game.players[i] == player) continue;
                                    if (player.inRange(game.players[i])) return true;
                                };
                                return false;
                            },
                            check: function(button) {
                                var player = _status.currentPhase;
                                if (button.link == 'maxHp') {
                                    if (player.isDamaged() && player.maxHp > 2) return 1;
                                    return -1;
                                };
                                var enemies = player.getEnemies();
                                var eff = 0;
                                var choices = player.storage.radiance_guanduan;
                                for (var i = 0; i < enemies.length; i++) {
                                    if (!player.inRange(enemies[i])) continue;
                                    if (choices[button.link][0](player, enemies[i])) {
                                        eff++;
                                    }
                                };
                                if (enemies.length <= 2) return 1 - eff;
                                return enemies.length - eff - 1;
                            },
                            backup: function(links, player) {
                                lib.skill.radiance_cangkong.link = links[0];
                                return {
                                    filterTarget: function(card, player, target) {
                                        if (target == player) return false;
                                        return player.inRange(target);
                                    },
                                    direct: true,
                                    selectTarget: 1,
                                    prompt: "令一名其他角色随机弃置装备区和手牌区的各一张牌，然后受到一点伤害",
                                    content: function() {
                                        'step 0'
                                        player.logSkill('radiance_cangkong', target);
                                        if (lib.skill.radiance_cangkong.link == 'maxHp') {
                                            player.loseMaxHp(1);
                                        } else {
                                            game.log(player, "废除了", 'radiance_guanduan', "的“", player.storage.radiance_guanduan[lib.skill.radiance_cangkong.link][1], "”条件");
                                            delete player.storage.radiance_guanduan[lib.skill.radiance_cangkong.link];
                                            var count = 0;
                                            for (var i in player.storage.radiance_guanduan) {
                                                count++;
                                            };
                                            if (count == 0) {
                                                player.unmarkSkill('radiance_guanduan');
                                            };
                                        };
                                        'step 1'
                                        target.randomDiscard('h', 1);
                                        'step 2'
                                        target.randomDiscard('e', 1);
                                        'step 3'
                                        target.damage('nocard', 1, player);
                                    },
                                    ai: {
                                        order: 7,
                                        result: {
                                            target: function(player, target) {
                                                if (target.countCards('he') == 0 && target.hp > 1) return -0.5;
                                                var effect = get.damageEffect(target, player, target);
                                                if (effect > 0) return 0;
                                                if (target.countCards('h') > 0) effect *= 1.1;
                                                if (target.countCards('e') > 0) effect *= 1.3;
                                                return effect;
                                            },
                                        },
                                    },
                                };
                            },
                        },
                        ai: {
                            order: 7,
                            result: {
                                player: function(player) {
                                    var enemies = player.getEnemies();
                                    var choices = player.storage.radiance_guanduan;
                                    for (var choice in choices) {
                                        var eff = 0;
                                        for (var i = 0; i < enemies.length; i++) {
                                            if (!player.inRange(enemies[i])) continue;
                                            if (choices[choice][0](player, enemies[i])) {
                                                eff++;
                                            }
                                        };
                                        if (enemies.length <= 2) {
                                            if (eff == 0) return 1;
                                        } else if (enemies.length - eff > 1) {
                                            return 1;
                                        };
                                    };
                                    if (player.isDamaged() && player.maxHp > 2) {
                                        for (var i = 0; i < enemies.length; i++) {
                                            if (!player.inRange(enemies[i])) continue;
                                            if (get.damageEffect(enemies[i], player, player) > 0 && enemies[i].countCards('he') > 0) {
                                                return 1;
                                            };
                                        };
                                    };
                                    return -1;
                                },
                            },
                            combo: 'radiance_guanduan',
                        },
                        action_tag: {
                            overall: 5,
                            damage: 3,
                            in: 1,
                        }
                    },
                    "radiance_ponian": {
                        enable: "phaseUse",
                        usable: 1,
                        filterTarget: function(card, player, target) {
                            return player != target && target.countCards('h') > 0;
                        },
                        content: function() {
                            'step 0'
                            player.choosePlayerCard(target, 'h', 1, true, '展示' + get.translation(target) + '的一张手牌');
                            'step 1'
                            event.card = result.cards[0];
                            target.showCards(event.card, get.translation(target) + '的一张手牌');
                            game.delay(1.5);
                            'step 2'
                            if (!player.countCards('h')) {
                                event.finish();
                            } else {
                                var dialog = ui.create.dialog("破念");
                                dialog.add("弃置一张牌来执行后续效果？");
                                dialog.add(event.card, 'card');
                                player.chooseToDiscard('h', dialog, 1).set('ai', function(card) {
                                    var valt = get.value(_status.event.card2, _status.event.target);
                                    var valp = get.value(_status.event.card2, _status.event.player);
                                    var val = get.value(card);

                                    if (valt < 0) {
                                        return 3 - val;
                                    } else if (get.suit(card) == get.suit(_status.event.card2)) {
                                        return 3.1 + valp + valt - val;
                                    } else if (valt > 0 && get.color(card) == get.color(_status.event.card2)) {
                                        return valp + valt - val;
                                    }
                                    return valt + 1 - val;
                                }).set('card2', event.card).set('target', target);
                            }
                            'step 3'
                            if (result.bool) {
                                var cardx = result.cards[0];
                                if (get.color(cardx) == get.color(event.card)) {
                                    player.gain(event.card, 'giveAuto', target);
                                } else {
                                    target.discard(event.card, 'notBySelf', player);
                                }
                                if (get.suit(cardx) == get.suit(event.card)) {
                                    target.damage('nocard');
                                }
                            };
                        },
                        ai: {
                            order: function(item, player) {
                                var min = 15.1;
                                var hs = player.getCards('h');
                                for (var i = 0; i < hs.length; i++) {
                                    if (!get.tag(hs[i], 'draw')) continue;
                                    var name = get.name(hs[i]);
                                    var temp = get.order({
                                        name: name
                                    });
                                    min = Math.min(min, temp);
                                }
                                return min - 0.1;
                            },
                            result: {
                                target: function(player, target) {
                                    var eff = get.damageEffect(target, player);
                                    if (target.hasSkillTag('nodamage')) return eff * 0.3;
                                    return eff;
                                }
                            }
                        },
                    },
                    "radiance_hongguan": {
                        trigger: {
                            player: 'phaseDiscardBefore',
                        },
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        locked: false,
                        content: function() {
                            'step 0'
                            player.showHandcards();
                            var suits = [];
                            var hs = player.getCards('h');
                            for (var i = 0; i < hs.length; i++) {
                                suits.add(get.suit(hs[i]));
                            }
                            event.num = suits.length;
                            'step 1'
                            var str1 = '摸一张牌';
                            var str2 = '手牌上限+1';
                            player.chooseControl([str1, str2]).set('prompt', "虹冠：选择一项：（还能选择" + event.num + "次）").set('ai', function(event, player) {
                                if (player.needsToDiscard()) return 1;
                                return 0;
                            })
                            'step 2'
                            if (result.index == 0) {
                                player.draw(1);
                            } else {
                                player.addTempSkill('radiance_hongguan_maxHand');
                                player.storage.radiance_hongguan_maxHand++;
                            };
                            event.num--;
                            if (event.num > 0) event.goto(1);
                        },
                        subSkill: {
                            maxHand: {
                                charlotte: true,
                                mod: {
                                    maxHandcardBase: function(player, num) {
                                        return num + player.storage.radiance_hongguan_maxHand;
                                    },
                                },
                                init: function(player, skill) {
                                    if (typeof player.storage.radiance_hongguan_maxHand != 'number') player.storage.radiance_hongguan_maxHand = 0;
                                },
                                onremove: function(player, skill) {
                                    player.storage.radiance_hongguan_maxHand = 0;
                                },
                            },
                        },
                    },
                    "radiance_wanling": {
                        trigger: {
                            player: 'phaseDrawBegin1'
                        },
                        frequent: true,
                        derivation: ['radiance_lingyao', 'radiance_wanxiang'],
                        content: function() {
                            'step 0'
                            if (!event.numFixed) trigger.changeToZero();
                            var num = 3;
                            var cards = get.cards(num);
                            event.count = 0;
                            for (var i = 0; i < cards.length; i++) {
                                event.count += cards[i].number;
                            }
                            player.showCards(cards);
                            player.gain(cards, 'gain2');
                            'step 1'
                            var num1 = 18;
                            var num2 = 24;
                            if (event.count <= num1) {
                                player.addTempSkill('radiance_lingyao');
                                player.popup('radiance_lingyao');
                            } else if (event.count >= num2) {
                                player.addTempSkill('radiance_wanxiang');
                                player.popup('radiance_wanxiang');
                            } else if (player.storage.radiance_cheli) {
                                player.addTempSkill('radiance_zhisu');
                                player.popup('radiance_zhisu');
                            }
                        },
                        ai: {
                            threaten: 1.5
                        },
                    },
                    "radiance_fuxing": {
                        trigger: {
                            global: ['phaseDiscardEnd'],
                        },
                        filter: function(event, player) {
                            if (game.isHonorRadiance && event.player != player) return false;
                            var cards = [];
                            event.player.getHistory('lose', function(evt) {
                                if (evt && evt.getParent('phaseDiscard') == event && evt.hs) cards.addArray(evt.hs);
                            });
                            return cards.length > 0;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            if (trigger.player != player) {
                                player.chooseBool(get.prompt2('radiance_fuxing', trigger.player, player)).set('choice', get.attitude(player, trigger.player) > 1);
                            } else {
                                var cards = [];
                                trigger.player.getHistory('lose', function(evt) {
                                    if (evt && evt.getParent('phaseDiscard') == trigger && evt.hs) cards.addArray(evt.hs);
                                });
                                event.count = Math.min(cards.length, 3);
                                var dialog = ui.create.dialog(get.prompt('radiance_fuxing'));
                                dialog.addText('令一名其他角色摸' + get.cnNumber(event.count) + '张牌');
                                player.chooseTarget(dialog, lib.filter.notMe).set('ai', function(target) {
                                    var player = _status.event.player;
                                    if (get.attitude(player, target) < 1) return 0;
                                    return get.attitude(player, target) / (0.5 + target.hp * 1.3 + target.countCards('h') * 0.8);
                                });
                            };
                            'step 1'
                            if (result.bool) {
                                if (trigger.player != player) {
                                    player.logSkill('radiance_fuxing', trigger.player);
                                    trigger.player.draw(1, player);
                                } else {
                                    var target = result.targets[0];
                                    player.logSkill('radiance_fuxing', target);
                                    player.line(target);
                                    target.draw(event.count);
                                }
                            };
                        },
                        ai: {
                            expose: 0.3,
                        },
                    },
                    "radiance_cheli": {
                        skillAnimation: true,
                        animationColor: 'water',
                        unique: true,
                        juexingji: true,
                        derivation: 'radiance_pofa',
                        trigger: {
                            player: 'dyingBegin'
                        },
                        //priority:10,
                        forced: true,
                        filter: function(event, player) {
                            var evt = event.getParent();
                            if (evt.player != player || evt.name != 'damage') return false;
                            if (evt.card && evt.card.name == 'sha') return false;
                            return !player.storage.radiance_cheli;
                        },
                        init: function(player) {
                            if (!player.storage.radiance_cheli) player.storage.radiance_cheli = false;
                        },
                        content: function() {
                            'step 0'
                            player.awakenSkill('radiance_cheli');
                            player.removeSkill('radiance_fuxing');
                            player.loseMaxHp();
                            'step 1'
                            if (player.hp < 2) {
                                player.recover(2 - player.hp);
                            };
                            'step 2'
                            player.addSkill('radiance_pofa');
                            player.storage.radiance_cheli = true;
                        },
                    },

                    // hheng
                    "radiance_yanzhen": {
                        trigger: {
                            global: ['respond', 'useCard2'],
                        },
                        getx: function(event, player) {
                            var cards = [];
                            if (!player.storage.radiance_yanzhen) {
                                if (get.itemtype(event.respondTo[1]) == 'card' && event.respondTo[1] != event.card) {
                                    cards.push(event.respondTo[1]);
                                };
                                if (get.itemtype(event.respondTo[1]) == 'cards') {
                                    cards.addArray(event.respondTo[1]);
                                };
                                if (event.respondTo[1].cards) {
                                    cards.addArray(event.respondTo[1].cards);
                                };
                                if (event.cards) {
                                    for (var i = 0; i < event.cards.length; i++) {
                                        cards.remove(event.cards[i]);
                                    }
                                };
                            } else if (event.player != player) {
                                if (event.cards && event.cards.length > 0) {
                                    cards.addArray(event.cards);
                                } else if (event.card) {
                                    cards.add(event.card);
                                };
                            };
                            cards = cards.filterInD('od')
                            return cards;
                        },
                        filter: function(event, player) {
                            if (!event.respondTo) return false;
                            if (get.name(event.card) != 'wuxie') return false;
                            // if (event.player == player && player == event.respondTo[0]) return false;

                            return lib.skill.radiance_yanzhen.getx(event, player).length > 0;
                        },
                        prompt2: function(event, player) {
                            return "获得" + get.translation(lib.skill.radiance_yanzhen.getx(event, player)) + "";
                        },
                        check: function(event, player) {
                            return get.value(lib.skill.radiance_yanzhen.getx(event, player)) > 0;
                        },
                        content: function() {
                            'step 0'
                            event.cards = lib.skill.radiance_yanzhen.getx(trigger, player);
                            player.storage.radiance_yanzhen = player.storage.radiance_yanzhen ? false : true;
                            'step 1'
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
                    'radiance_yanzhen_ai': {
                        mod: {
                            aiOrder: function(player, card, num) {
                                var targets = game.filterPlayer(function(target) {
                                    return target.hasSkill('radiance_yanzhen');
                                });
                                if (get.name(card) == 'wuxie' && targets.length > 0) {
                                    targets.sort(function(a, b) {
                                        return get.distance(player, a, 'absolute') - get.distance(player, b, absolute);
                                    });
                                    if (get.attitude(player, targets[0]) < 0) return 0;
                                };
                            },
                            aiValue: function(player, card, num) {
                                var targets = game.filterPlayer(function(target) {
                                    return target.hasSkill('radiance_yanzhen');
                                });
                                if (get.name(card) == 'wuxie' && targets.length > 0) {
                                    targets.sort(function(a, b) {
                                        return get.distance(player, a, 'absolute') - get.distance(player, b, absolute);
                                    });
                                    if (get.attitude(player, targets[0]) < 0) return 0;
                                };
                            },
                            cardEnabled: function(card, player) {
                                if (player.hasSkill('radiance_yanzhen') || player == game.me) return;
                                var targets = game.filterPlayer(function(target) {
                                    return target.hasSkill('radiance_yanzhen');
                                });
                                if (get.name(card) == 'wuxie' && targets.length > 0) {
                                    targets.sort(function(a, b) {
                                        return get.distance(player, a, 'absolute') - get.distance(player, b, absolute);
                                    });
                                    if (get.attitude(player, targets[0]) < 0) return false;
                                };
                            },
                        },
                        charlotte: true,
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

                    "radiance_weipo": {
                        trigger: {
                            player: "phaseUseBegin",
                        },
                        init: function(player) {
                            if (!player.storage.radiance_weipo) player.storage.radiance_weipo = [];
                        },
                        marktext: "威",
                        intro: {
                            content: "cards",
                        },
                        locked: false,
                        frequent: true,
                        filter: function(event, player) {
                            return true;
                        },
                        content: function() {
                            'step 0'
                            player.draw();
                            'step 1'
                            player.storage.radiance_weipo = [];
                            player.chooseCard([1, 3], function(card, player) {
                                return get.tag(card, 'damage');
                            }).set('ai', function(card) {
                                if (ui.selected.cards.length < 1) return true;
                                if (player.countCards('h') > 5 && ui.selected.cards.length >= 1) return false;
                                if (game.hasPlayer(function(current) {
                                        if (get.attitude(player, current) >= 0) return false;
                                        var base = player.countCards('h', function(card) {
                                            return (get.tag(card, 'damage') && player.canUse(card, current));
                                        });
                                        return (current.hp <= Math.min(base, 2));
                                    })) return false;
                                return true;
                            }).set('prompt', '威迫：选择至多三张伤害牌并展示');
                            'step 2'
                            if (result.bool) {
                                player.showCards(result.cards);
                                var num = result.cards.length;
                                if (result.cards.length > 1) {
                                    for (var i = 0; i < result.cards.length; i++) {
                                        if (!player.storage.radiance_weipo.contains(result.cards[i])) {
                                            player.storage.radiance_weipo.push(result.cards[i]);
                                        }
                                    }
                                    player.markSkill('radiance_weipo');
                                    player.addTempSkill('radiance_weipo_af');
                                };
                                player.draw(num);
                            };
                        },
                        action_tag: {
                            overall: 5,
                            draw: 3,
                            negative: 0.5,
                        },
                    },
                    "radiance_weipo_af": {
                        charlotte: true,
                        debuff: true,
                        mod: {
                            cardEnabled: function(card) {
                                if (card.name == 'sha') return false;
                            },
                            ignoredHandcard: function(card, player) {
                                if (player.storage.radiance_weipo) {
                                    if (player.storage.radiance_weipo.contains(card)) return true;
                                    for (var i = 0; i < player.storage.radiance_weipo.length; i++) {
                                        var card2 = player.storage.radiance_weipo[i];
                                        if (get.number(card) == get.number(card2) && get.suit(card) == get.suit(card2) && get.name(card) == get.name(card2) && get.nature(card) == get.nature(card2)) {
                                            return true;
                                        }
                                    }
                                }
                            },
                            cardDiscardable: function(card, player, name) {
                                if (name == 'phaseDiscard' && player.storage.radiance_weipo) {
                                    if (player.storage.radiance_weipo.contains(card)) return false;
                                    for (var i = 0; i < player.storage.radiance_weipo.length; i++) {
                                        var card2 = player.storage.radiance_weipo[i];
                                        if (get.number(card) == get.number(card2) && get.suit(card) == get.suit(card2) && get.name(card) == get.name(card2) && get.nature(card) == get.nature(card2)) {
                                            return false;
                                        }
                                    }
                                }
                            },
                            aiOrder: function(player, card, num) {
                                if (player.storage.radiance_weipo && player.storage.radiance_weipo.contains(card)) {
                                    return num - 0.3;
                                }
                            },
                        },
                        onremove: function(player, skill) {
                            player.storage.radiance_weipo = [];
                            player.unmarkSkill('radiance_weipo');
                        },
                        ai: {
                            neg: true,
                        },
                    },
                    "radiance_xianzhuo": {
                        group: ['radiance_xianzhuo_sha', 'radiance_xianzhuo_shan', 'radiance_xianzhuo_wuxie'],
                        ai: {
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function(player) {
                                return player.countCards('h') > 0;
                            },
                        },
                    },
                    "radiance_xianzhuo_sha": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        filterCard: true,
                        selectCard: function() {
                            return _status.event.player.countCards('h');
                        },
                        position: 'h',
                        viewAs: {
                            name: 'sha'
                        },
                        complexCard: true,
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        prompt: '将所有手牌当作【杀】使用或打出',
                        onuse: function(result, player) {
                            player.logSkill('radiance_xianzhuo');
                        },
                        onrespond: function(result, player) {
                            player.logSkill('radiance_xianzhuo');
                        },
                        check: function(card) {
                            var num = _status.event.player.countCards('h');
                            var base = 6;
                            if (card.name == 'sha' && num > 2) return 0;
                            if (num == 1) {
                                base = 8;
                            } else if (num == 2) {
                                base = 7;
                            }
                            return base - get.value(card)
                        },
                    },
                    "radiance_xianzhuo_shan": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        filterCard: true,
                        selectCard: function() {
                            return _status.event.player.countCards('h');
                        },
                        position: 'h',
                        viewAs: {
                            name: 'shan'
                        },
                        complexCard: true,
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        prompt: '将所有手牌当作【闪】使用或打出',
                        onuse: function(result, player) {
                            player.logSkill('radiance_xianzhuo');
                        },
                        onrespond: function(result, player) {
                            player.logSkill('radiance_xianzhuo');
                        },
                        check: function(card) {
                            var num = _status.event.player.countCards('h');
                            var base = 6;
                            if (card.name == 'shan' && num > 2) return 0;
                            if (num == 1) {
                                return 1;
                            } else if (num == 2) {
                                base = 7;
                            }
                            return base - get.value(card)
                        },
                    },
                    "radiance_xianzhuo_wuxie": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        prompt: function() {
                            return '将所有手牌当作【无懈可击】使用';
                        },
                        position: 'h',
                        check: function(card, event) {
                            if (_status.event.player.countCards('h') == 1) return 1;
                            return 7 - get.value(card);
                        },
                        selectCard: function() {
                            return _status.event.player.countCards('h');
                        },
                        viewAs: {
                            name: 'wuxie'
                        },
                        onuse: function(result, player) {
                            player.logSkill('radiance_xianzhuo');
                        },
                        onrespond: function(result, player) {
                            player.logSkill('radiance_xianzhuo');
                        },
                        viewAsFilter: function(player) {
                            return player.countCards('h') > 0;
                        },
                        filterCard: true,
                    },
                    "radiance_danlue": {
                        trigger: {
                            global: 'phaseJieshu'
                        },
                        frequent: true,
                        filter: function(event, player) {
                            return player.countCards('h') < 2;
                        },
                        content: function() {
                            'step 0'
                            player.drawTo(2);
                        },
                    },

                    "radiance_feiren": {
                        mod: {
                            selectTarget: function(card, player, range) {
                                if (range[1] == -1) return;
                                if (card.name == 'sha') range[1] += 1;
                            },
                            attackFrom: function(from, to, current) {
                                return current - 1;
                            },
                        },
                    },
                    "radiance_qiaowu": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        usable: 1,
                        filter: function(event, player) {
                            return !player.hasSkill('radiance_qiaowu_used');
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
                                    } else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                                }
                                if (list.length == 0) {
                                    return ui.create.dialog('巧舞没有可用牌');
                                }
                                return ui.create.dialog('巧舞', [list, 'vcard']);
                            },
                            filter: function(button, player) {
                                var evt = _status.event.getParent();
                                return evt.filterCard({
                                    name: button.link[2]
                                }, player, evt);
                            },
                            check: function(button) {
                                var player = _status.event.player;
                                var name = button.link[2];

                                if (player.countCards('h', name) > 0) return 0;
                                if (name == 'shan') return 1;

                                var evt = _status.event.getParent('chooseToUse');
                                if (evt && evt.type == 'dying') {
                                    if (evt.dying != player && get.effect(evt.dying, {
                                            name: name
                                        }, player, player) <= 0) return 0;
                                    if (evt.dying == player && name == 'jiu') return 2.1;
                                    return 2;
                                }

                                if (player.countUsed('sha', true) > 0 && name == 'jiu') return 0;
                                var effect = player.getUseValue(name) || 0.5;
                                if (effect > 0) return effect;
                                return 0;
                            },
                            backup: function(links, player) {
                                return {
                                    filterCard: function(card, player) {
                                        return false;
                                    },
                                    selectCard: -1,
                                    popname: true,
                                    viewAs: {
                                        name: links[0][2],
                                        nature: links[0][3]
                                    },
                                    onuse: function(result, player) {
                                        player.logSkill('radiance_qiaowu');
                                        player.addTempSkill('radiance_qiaowu_used');
                                    },
                                    onrespond: function(result, player) {
                                        player.logSkill('radiance_qiaowu');
                                        player.addTempSkill('radiance_qiaowu_used');
                                    },
                                };
                            },
                            prompt: function(links, player) {
                                return '视为使用或打出了' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '';
                            }
                        },
                        ai: {
                            save: true,
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function(player) {
                                if (player.hasSkill('radiance_qiaowu_used')) return false;
                            },
                            order: 7,
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
                            threaten: 1.3,
                        },
                        subSkill: {
                            used: {
                                charlotte: true,
                                forced: true,
                                silent: true,
                                trigger: {
                                    global: ['phaseEnd'],
                                },
                                content: function() {
                                    'step 0'
                                    player.judge(function(card) {
                                        if (get.type(card) == 'basic') return -1;
                                        return 1;
                                    });
                                    'step 1'
                                    if (result.judge < 0) {
                                        player.gain(result.card, 'gain2');
                                    } else {
                                        event.finish();
                                    }
                                    'step 2'
                                    player.loseHp();
                                },
                            },
                        },
                    },
                    "radiance_shouwu": {
                        trigger: {
                            global: 'shaMiss'
                        },
                        direct: true,
                        filter: function(event, player) {
                            if (player.hasSkill('radiance_shouwu_shaed') && player.hasSkill('radiance_shouwu_shaned')) return false;
                            return event.cards || event.responded;
                        },
                        mark: true,
                        intro: {
                            mark: function(dialog, storage, player, skill) {
                                var bool1 = true;
                                var bool2 = true;
                                if (player.hasSkill('radiance_shouwu_shaed')) bool1 = false;
                                if (player.hasSkill('radiance_shouwu_shaned')) bool2 = false;
                                if (bool1 && bool2) {
                                    return "获得【杀】、【闪】的效果均可以发动";
                                } else if (bool1) {
                                    return "可以发动获得【杀】的效果";
                                } else if (bool2) {
                                    return "可以发动获得【闪】的效果";
                                }
                                return "两个效果本轮均已发动";
                            },
                        },
                        onremove: function(player) {
                            player.removeSkill('radiance_shouwu_shaed');
                            player.removeSkill('radiance_shouwu_shaned');
                        },
                        content: function() {
                            'step 0'
                            var choices = [];
                            var choice_info = [];
                            if (trigger.cards && trigger.cards.filterInD('od').length > 0 && !player.hasSkill('radiance_shouwu_shaed')) { //&& player != trigger.player
                                event.sha = trigger.cards.filterInD('od');
                                choices.push("获得杀");
                                choice_info.push("将此次被闪避的【杀】交给一名角色，你摸一张牌");
                            }
                            if (trigger.responded.cards && get.itemtype(trigger.responded.cards) == 'cards' && trigger.responded.cards.filterInD('od').length > 0 && !player.hasSkill('radiance_shouwu_shaned')) { // && player != trigger.target
                                event.shan = trigger.responded.cards.filterInD('od');
                                choices.push("获得闪");
                                choice_info.push("将此次使用的【闪】交给一名角色");
                            }
                            if (choices.length < 1) {
                                event.finish();
                            } else {
                                choices.push('cancel2');
                                player.chooseControl(choices, function() {
                                    if (choices.contains('获得闪')) {
                                        if (game.countPlayer(function(current) {
                                                return get.attitude(player, current) >= 1 && (!current.hasCard('h', 'shan') || current.hp < 3);
                                            }) > 0) return '获得闪';
                                    }
                                    if (choices.contains('获得杀')) {
                                        if (game.countPlayer(function(current) {
                                                return get.attitude(player, current) >= 1 && (!current.hasCard('h', 'sha') || current.needsToDiscard(1) < 1);
                                            }) > 0) {
                                            return '获得杀';
                                        }
                                        if (!player.needsToDiscard(2)) return '获得杀';
                                    }
                                    return choices[0];
                                }).set('prompt', get.prompt("radiance_shouwu")).set('choiceList', choice_info);
                            }
                            'step 1'
                            if (result.control != 'cancel2') {
                                event.choice = result.control;
                                event.cards = event.choice == '获得杀' ? event.sha : event.shan;
                                player.chooseTarget('将' + get.translation(event.cards) + '交给一名角色', true, function(card, player, target) {
                                    return true;
                                }).set('ai', function(target) {
                                    var base = 4;
                                    var att = get.attitude(player, target);
                                    if (event.choice == '获得闪') {
                                        if (target.countCards('h', 'shan') < 1) {
                                            base -= 2;
                                        }
                                        if (target.countCards('h', 'shan') < 2) {
                                            base -= 2;
                                        }
                                        base += Math.max(target.hp, 1);
                                    } else {
                                        if (target.countCards('h', 'sha') < 1) {
                                            base -= 3;
                                        }
                                        base += target.countCards('h');
                                    }
                                    if (base > 1 && target == player) base -= 1;
                                    return att / base;
                                });
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (result.bool) {
                                player.logSkill('radiance_shouwu', result.targets[0]);
                                result.targets[0].gain(event.cards, 'gain2');
                                if (event.choice == '获得杀') {
                                    player.draw();
                                    player.addTempSkill('radiance_shouwu_shaed', 'roundStart');
                                } else {
                                    player.addTempSkill('radiance_shouwu_shaned', 'roundStart');
                                }
                            }
                        },
                        subSkill: {
                            shaed: {
                                charlotte: true,
                            },
                            shaned: {
                                charlotte: true,
                            },
                        },
                        action_tag: {
                            overall: 4,
                            sha_bonus: 1,
                            search: 2,
                            draw: 0.5,
                        }
                    },
                    "radiance_zhidou": {
                        enable: ['chooseToRespond'],
                        filterCard: true,
                        selectCard: 1,
                        position: 'hes',
                        viewAs: {
                            name: 'sha'
                        },
                        filter: function(event, player) {
                            return player.countCards('he') > 0;
                        },
                        prompt: '将一张牌当作【杀】打出',
                        onrespond: function(result, player) {
                            player.logSkill('radiance_zhidou');
                        },
                        check: function(card) {
                            var base = 7;
                            return base - get.value(card)
                        },
                        ai: {
                            respondSha: true,
                            skillTagFilter: function(player) {
                                return player.countCards('he') > 0;
                            },
                            effect: {
                                target: function(card, player, target) {
                                    if (get.tag(card, 'respondSha')) {
                                        var hs = target.countCards('he');
                                        if (hs > 2) return [0, 0];
                                        if (hs > 0) return [0.5, 0.5];
                                    }
                                },
                            },
                        },
                    },


                    "radiance_tangong": {
                        trigger: {
                            player: 'useCardToPlayered'
                        },
                        filter: function(event, player) {
                            if (player.hasSkill('radiance_tangong_used')) return false;
                            return event.card.name == 'sha';
                        },
                        locked: false,
                        check: function(event, player) {
                            if (player.hasSkill('radiance_tangong_db')) return 1;
                            var target = event.target;
                            if (player.stat[player.stat.length - 1].card.sha > 0) {
                                return (target.countCards('h', 'shan') < 1 || (player.hp >= 3 && !player.needsToDiscard(-1)));
                            };

                            var base = target.countCards('h') * 0.2;
                            if (target.hasSkillTag('respondShan')) base += 0.3;
                            if (player.hp >= 3 && !player.needsToDiscard(-1)) base -= 0.3;
                            return Math.max(1 - Math.random() * 0.9 - base, 0);
                        },
                        content: function() {
                            'step 0'
                            player.draw(2);
                            player.addTempSkill('radiance_tangong_db');
                            player.addTempSkill('radiance_tangong_used');
                        },
                        mod: {
                            cardUsable: function(card, player, num) {
                                if (card.name == 'sha') return num + 1;
                            },
                        },
                        subSkill: {
                            used: {
                                charlotte: true,
                                locked: true,
                            },
                            db: {
                                trigger: {
                                    player: ['shaMiss', 'useCardAfter'],
                                },
                                forced: true,
                                charlotte: true,
                                silent: true,
                                firstDo: true,
                                sub: true,
                                content: function() {
                                    if (trigger.name != 'useCard') {
                                        player.loseHp(1);
                                        player.removeSkill('radiance_tangong_used');
                                    };
                                    player.removeSkill('radiance_tangong_db');
                                },
                            },
                        },
                    },
                    "radiance_zhengbian": {
                        trigger: {
                            player: "phaseAfter",
                        },
                        unique: true,
                        mark: true,
                        skillAnimation: true,
                        limited: true,
                        animationColor: 'fire',
                        intro: {
                            content: 'limited'
                        },
                        marktext: "变",
                        init: function(player) {
                            if (typeof player.storage.radiance_zhengbian != 'boolean') player.storage.radiance_zhengbian = false;
                        },
                        filter: function(event, player) {
                            if (game.roundNumber <= 1) return false;
                            return !player.storage.radiance_zhengbian;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseTarget(get.prompt2('radiance_zhengbian'), function(card, player, target) {
                                return player != target && target.hp >= player.hp;
                            }).set('ai', function(target) {
                                var player = _status.event.player;
                                if (target.isTurnedOver() && get.attitude(player, target) > 1) return 10;
                                if (target.isTurnedOver() && get.attitude(player, target) < 0) return -10;
                                return 1 - get.attitude(player, target);
                            });
                            'step 1'
                            if (result.bool) {
                                player.awakenSkill('radiance_zhengbian');
                                player.logSkill('radiance_zhengbian', result.targets);
                                result.targets[0].turnOver();
                            } else {
                                event.finish();
                            }
                            'step 2'
                            player.insertPhase();
                        },
                        ai: {
                            expose: 0.9,
                        },
                    },
                    "radiance_shouyue": {
                        enable: 'phaseUse',
                        usable: 1,
                        filter: function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.name(card) == 'sha' || get.subtype(card) == 'equip1';
                            }) > 0;
                        },
                        filterTarget: lib.filter.notMe,
                        filterCard: function(card, player) {
                            return get.name(card) == 'sha' || get.subtype(card) == 'equip1';
                        },
                        check: function(card) {
                            return 1 / Math.max(0.1, get.value(card));
                        },
                        position: 'he',
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
                            var num = 0;
                            return num == 0;
                        },
                        content: function() {
                            'step 0'
                            var num = Math.max(1, player.getDamagedHp());
                            if (player.getHistory('sourceDamage', function(evt) {
                                    return evt.num > 0 && evt.card && get.name(evt.card) == 'sha';
                                }).length > 0) {
                                player.draw(num);
                                event.finish();
                            } else {
                                var cards = get.cards(4 + num);
                                var next2 = player.next;
                                var ongoing = true;
                                while (next2 && next2 != player && ongoing) {
                                    if (!next2.isTurnedOver()) {
                                        ongoing = false;
                                    } else {
                                        next2 = next2.next;
                                    };
                                };
                                if (!next2) next2 = player.next;

                                var next = player.chooseToMove();
                                next.set('list', [
                                    ["牌堆顶", cards],
                                    ["获得"],
                                    ["牌堆底"],
                                ]);
                                next.set('prompt', "统观：选择至多" + get.cnNumber(num) + "张牌并获得，将其余牌置于牌堆顶或底");
                                next.set('num', num);
                                next.set('next2', next2);
                                next.set('filterMove', function(from, to, moved) {
                                    var num = _status.event.num || 1
                                    if (to == 1 && moved[1].length >= num) return false;
                                    return true;
                                });
                                next.set('filterOk', function(moved) {
                                    var num = _status.event.num || 1;
                                    return moved[1].length <= num;
                                });
                                next.processAI = function(list) {
                                    var cards = list[0][1],
                                        player = _status.event.player,
                                        next2 = _status.event.next2,
                                        num = _status.event.num;
                                    cards.sort(function(a, b) {
                                        return get.value(b, player) - get.value(a, player);
                                    });
                                    var togain = [];
                                    for (var i = 0; i < num; i++) {
                                        if (get.value(cards[i], player) > 0) togain.push(cards[i]);
                                    };
                                    cards.removeArray(togain);
                                    var top = [];
                                    var judges = next2.getCards('j');
                                    var att_cur = get.attitude(player, next2) > 0 ? 1 : -1;
                                    var stopped = false;
                                    if (!next2.hasWuxie()) {
                                        for (var i = 0; i < judges.length; i++) {
                                            var judge = get.judge(judges[i]);
                                            cards.sort(function(a, b) {
                                                return (judge(b) - judge(a)) * att_cur;
                                            });
                                            if (judge(cards[0]) < 0) {
                                                stopped = true;
                                                break;
                                            } else {
                                                top.unshift(cards.shift());
                                            };
                                        };
                                    };
                                    var bottom;
                                    if (!stopped) {
                                        cards.sort(function(a, b) {
                                            return (get.value(b, next2) - get.value(a, next2)) * att_cur;
                                        });
                                        while (cards.length) {
                                            if (get.value(cards[0], next2) < 5 && att_cur > 0) break;
                                            if (get.value(cards[0], next2) > 4 && att_cur < 0) break;
                                            top.unshift(cards.shift());
                                        };
                                    };
                                    return [top, togain, cards];
                                };
                            };
                            'step 1'
                            if (result.bool) {
                                var togain = result.moved[1];
                                player.gain(togain, 'draw');
                            };
                            'step 2'
                            var top = result.moved[0];
                            var bottom = result.moved[2];
                            top.reverse();
                            for (var i = 0; i < top.length; i++) {
                                ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
                            }
                            for (i = 0; i < bottom.length; i++) {
                                ui.cardPile.appendChild(bottom[i]);
                            }
                            player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
                            game.log(player, "将" + get.cnNumber(top.length) + "张牌置于牌堆顶");
                            game.log(player, "将" + get.cnNumber(bottom.length) + "张牌置于牌堆底");
                            'step 3'
                            game.updateRoundNumber();
                            game.delayx();
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
                    "radiance_muyi": {
                        global: 'radiance_muyi_gl',
                    },
                    "radiance_muyi_gl": {
                        trigger: {
                            source: 'damageSource',
                        },
                        locked: true,
                        charlotte: true,
                        filter: function(event, player) {
                            if (!event.num || !event.card || get.name(event.card) != 'sha') return false;
                            return game.filterPlayer(function(current) {
                                return current.hasSkill('radiance_muyi') && current.isDamaged();
                            }).length > 0 && player.countCards('he');
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseCardTarget({
                                prompt: get.prompt('radiance_muyi'),
                                prompt2: ("是否弃置一张牌，令一名有“母仪”的角色回复一点体力？"),
                                filterCard: function(card, player) {
                                    return lib.filter.cardDiscardable(card, player)
                                },
                                position: 'he',
                                filterTarget: function(card, player, target) {
                                    return target.hasSkill('radiance_muyi');
                                },
                                ai1: function(card) {
                                    var player = _status.event.player;
                                    var effect = 0;
                                    for (var i = 0; i < game.players.length; i++) {
                                        if (!game.players[i].hasSkill('radiance_muyi')) continue;
                                        effect = Math.max(effect, get.recoverEffect(game.players[i], player, player));
                                    };
                                    if (effect <= 0) return 0;
                                    if (!player.needsToDiscard()) return effect - player.getUseValue(card);
                                    return 1 / Math.max(0.1, player.getUseValue(card));
                                },
                                ai2: function(target) {
                                    var player = _status.event.player;
                                    return get.recoverEffect(target, player, player);
                                },
                            });
                            'step 1'
                            if (result.bool) {
                                player.logSkill('radiance_muyi', result.targets);
                                player.line(result.targets, 'red');
                                player.discard(result.cards[0]);
                                result.targets[0].recover(player, 1, result.cards[0], result.cards);
                            } else {
                                event.finish();
                            };
                        },
                    },
                    "radiance_shezheng": {
                        enable: 'phaseUse',
                        usable: 1,
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        filterCard: true,
                        filterTarget: function(card, player, target) {
                            return target != player && !target.getStorage('radiance_shezheng_af').length;
                        },
                        check: function(card) {
                            return 6 - get.value(card)
                        },
                        position: 'h',
                        discard: false,
                        toStorage: true,
                        prepare: 'give',
                        content: function() {
                            target.addSkill('radiance_shezheng_af');
                            target.markAuto('radiance_shezheng_af', cards);
                            target.storage.radiance_shezheng = player;
                        },
                        ai: {
                            order: 7,
                            result: {
                                target: function(player, target) {
                                    var next = get.distance(player, target, 'absolute');
                                    return (target.hp + 1) / (next + 1);
                                },
                            },
                        },
                    },
                    "radiance_shezheng_af": {
                        intro: {
                            mark: function(dialog, storage, player, skill) {
                                if (!player.storage.radiance_shezheng_af) return;
                                dialog.addText('牌');
                                dialog.addSmall(player.storage.radiance_shezheng_af);
                                dialog.addText('来源');
                                dialog.addSmall([player.storage.radiance_shezheng]);
                            },
                            onunmark: function(storage, player) {
                                if (storage && storage.length) {
                                    player.$throw(storage, 1000);
                                    game.cardsDiscard(storage);
                                    game.log(storage, '被置入了弃牌堆');
                                    storage.length == 0;
                                }
                            },
                        },
                        trigger: {
                            player: 'phaseUseBegin'
                        },
                        forced: true,
                        charlotte: true,
                        priority: 20,
                        content: function() {
                            'step 0'
                            if (!player.storage.radiance_shezheng.isIn()) {
                                event.choice = true;
                            }
                            var str = "###摄政###视为使用一张【杀】并获得" + get.translation(player.storage.radiance_shezheng_af) + "，否则你本回合每次获得牌均会令" + get.translation(player.storage.radiance_shezheng) + "摸牌";
                            player.chooseTarget(1, str, function(card, player, target) {
                                return target != player && player.canUse('sha', target, false);
                            }).set('ai', function(target) {
                                if (target.hasSkillTag('nodamage')) return 0;
                                var player = _status.event.player;
                                var draw = lib.watersky.func.playersActionTag(_status.event.player, 'draw', 'in');
                                if (draw < 0) draw = 0;

                                var cards = _status.event.player.getCards('hs', function(card) {
                                    if (get.tag(card, 'draw')) {
                                        if (typeof get.tag(card, 'draw') == 'number') {
                                            draw += 1; // get.tag(card, 'draw');
                                        } else {
                                            draw++
                                        }
                                        return true;
                                    }
                                    return false;
                                });
                                if (draw >= 2 && _status.event.source.isIn() && get.attitude(_status.event.player, _status.event.source) > 0) return 0;
                                var val = get.value(_status.event.cardx, _status.event.player);
                                return get.effect(target, {
                                    name: 'sha',
                                    isCard: false
                                }, _status.event.player, _status.event.player) + val;
                            }).set('cardx', player.storage.radiance_shezheng_af[0]).set('source', player.storage.radiance_shezheng);
                            'step 1'
                            if (result.bool || event.choice) {
                                player.gain(player.storage.radiance_shezheng_af, 'draw', 'log', 'fromStorage');

                                if (result.targets && result.targets.length) {
                                    player.useCard({
                                        name: 'sha',
                                        isCard: false
                                    }, false, result.targets[0], 'noai').set('animate', true);
                                }
                                delete player.storage.radiance_shezheng;
                            } else {
                                game.cardsDiscard(player.storage.radiance_shezheng_af);
                                game.log(player.storage.radiance_shezheng_af, '进入弃牌堆');
                                player.$throw(player.storage.radiance_shezheng_af, 1000);
                                player.addTempSkill('radiance_shezheng_afdraw');
                            }
                            delete player.storage.radiance_shezheng_af;
                            player.removeSkill('radiance_shezheng_af');
                        },
                    },
                    "radiance_shezheng_afdraw": {
                        onremove: function(player) {
                            delete player.storage.radiance_shezheng;
                        },
                        trigger: {
                            player: 'gainAfter',
                        },
                        mark: true,
                        intro: {
                            name: '摄政',
                        },
                        forced: true,
                        charlotte: true,
                        filter: function(event, player) {
                            var cards = event.cards;
                            if (!cards || !cards.length) return false;
                            return player.storage.radiance_shezheng && player.storage.radiance_shezheng.isIn();
                        },
                        content: function() {
                            player.logSkill('radiance_shezheng_afdraw', player.storage.radiance_shezheng);
                            player.line(player.storage.radiance_shezheng, 'green');
                            player.storage.radiance_shezheng.draw(1);
                        },
                    },
                    "radiance_wubei": {
                        trigger: {
                            player: 'phaseDrawBegin'
                        },
                        filter: function(event, player) {
                            return player.countCards('h', 'sha') == 0;
                        },
                        content: function() {
                            'step 0'
                            player.showHandcards();
                            trigger.num++;
                        },
                        action_tag: {
                            overall: 1,
                            draw: 1,
                        },
                    },
                    "radiance_lizheng": {
                        trigger: {
                            player: 'useCardToTargeted',
                        },
                        logTarget: 'target',
                        check: function(event, player) {
                            return get.attitude(player, event.target) <= 0;
                        },
                        filter: function(event, player) {
                            if (event.card.name != 'sha') return false;
                            return true;
                        },
                        locked: false,
                        content: function() {
                            'step 0'
                            var next = trigger.target.chooseToRespond({
                                name: 'sha'
                            });
                            next.set('ai', function(card) {
                                var trigger = _status.event.getTrigger();
                                var player = _status.event.player;
                                if (player.hasSkillTag('nodamage')) return 0;
                                if (get.effect(player, trigger.card, trigger.player, player) >= 0) return 0;
                                return 11 - get.useful(card);
                            });
                            next.autochoose = lib.filter.autoRespondSha;
                            'step 1'
                            if (result.bool) {
                                player.draw();
                                trigger.getParent().excluded.add(trigger.target);
                                if (trigger.getParent().addCount !== false) {
                                    trigger.getParent().addCount = false;
                                    if (player.stat[player.stat.length - 1].card.sha > 0) {
                                        player.stat[player.stat.length - 1].card.sha--;
                                    };
                                };
                            } else {
                                trigger.target.damage().set('card', trigger.card).set('cards', trigger.cards).set('nature', get.nature(trigger.card));
                            };
                        },
                        action_tag: {
                            overall: 4,
                            sha_bonus: 2,
                            demand_sha: 2,
                            change: 0.5,
                        }
                    },


                    "radiance_kaiyang": {
                        enable: 'phaseUse',
                        filter: function(event, player) {
                            if (player.getStat('damage') > 0) return false;

                            return player.countCards('h', function(card) {
                                return get.color(card) == 'red';
                            }) > 0;
                        },
                        filterCard: function(card, player) {
                            return get.color(card) == 'red';
                        },
                        position: 'h',
                        check: function(card) {
                            var num = Math.min(ui.cardPile.childNodes.length, 2);
                            var player = _status.event.player;
                            var count = 0,
                                bool = false;
                            for (var i = 0; i < num; i++) {
                                if (get.tag(ui.cardPile.childNodes[i], 'damage') || (get.type(ui.cardPile.childNodes[i]) == 'equip' && get.subtype(ui.cardPile.childNodes[i]) == 'equip1')) {
                                    count += get.value(ui.cardPile.childNodes[i]);
                                }
                                if (get.color(ui.cardPile.childNodes[i]) == 'red') {
                                    bool = true;
                                }
                            };
                            if (bool) count += 3;
                            return count - get.value(card);
                        },
                        filterTarget: function(card, player, target) {
                            return player != target;
                        },
                        selectTarget: 1,
                        content: function() {
                            'step 0'
                            event.num = 0;
                            target.addTempSkill('radiance_kaiyang_db', 'radiance_kaiyangEnd');
                            'step 1'
                            var cards = get.cards(2);
                            game.cardsGotoOrdering(cards);
                            player.showCards(cards, '开阳');
                            game.delay(0, 1);
                            event.cardsx = [];
                            for (var i = 0; i < cards.length; i++) {
                                if (get.color(cards[i]) == 'red') {
                                    event.num = 1;
                                };
                                if (get.tag(cards[i], 'damage') || (get.type(cards[i]) == 'equip' && get.subtype(cards[i]) == 'equip1')) {
                                    event.cardsx.add(cards[i]);
                                };
                            };
                            'step 2'
                            if (event.num > 0) target.damage(event.num, 'fire');
                            'step 3'
                            if (event.cardsx.length > 0) player.gain(event.cardsx, 'gain2');
                        },
                        ai: {
                            order: 10,
                            result: {
                                player: function(player) {
                                    var num = Math.min(ui.cardPile.childNodes.length, 2);
                                    var count = 0;
                                    for (var i = 0; i < num; i++) {
                                        if (get.tag(ui.cardPile.childNodes[i], 'damage') || (get.type(ui.cardPile.childNodes[i]) == 'equip' && get.subtype(ui.cardPile.childNodes[i]) == 'equip1')) {
                                            count++;
                                        }
                                    }
                                    return count * 0.5;
                                },
                                target: function(player, target) {
                                    if (target.hasSkillTag('nodamage' || 'nofire')) return 0;

                                    var num = Math.min(ui.cardPile.childNodes.length, 2);
                                    var count = 0;
                                    for (var i = 0; i < num; i++) {
                                        if (get.color(ui.cardPile.childNodes[i]) == 'red') {
                                            count++;
                                        }
                                    }
                                    var eff = get.damageEffect(target, player);
                                    return eff * count;
                                },
                            },
                            threaten: 1.8,
                        },
                        action_tag: {
                            overall: 2.5,
                            damage: 1,
                            search: 0.5,
                        }
                    },
                    "radiance_kaiyang_db": {
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
                        marktext: "阳",
                        charlotte: true,
                        locked: true,
                        debuff: true,
                        intro: {
                            content: function(storage, player, skill) {
                                var str = "不能使用或打出牌，";
                                var list = player.getSkills(null, false, false).filter(function(i) {
                                    return lib.skill.radiance_kaiyang_db.skillBlocker(i, player);
                                });
                                if (list.length) return str + "失效技能：" + get.translation(list);
                                return "不能使用或打出牌";
                            }
                        },
                        mod: {
                            cardEnabled2: function(card) {
                                return false;
                            },
                        },
                        ai: {
                            neg: true,
                            forbid_card: true,
                        },
                    },



                    // uunion
                    "radiance_caopan": {
                        trigger: {
                            player: 'phaseJieshuBegin'
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseTarget([1, 3], get.prompt2('radiance_caopan'), lib.filter.notMe).set('ai', function(target) {
                                if (get.attitude(player, target) > 0) return 0.5;
                                return 1 - get.attitude(player, target);
                            });
                            'step 1'
                            if (result.bool && result.targets.length) {
                                event.targets = result.targets;
                                event.targets.sort(lib.sort.seat);
                                event.targets2 = event.targets.slice(0);

                                player.line(event.targets);
                                player.logSkill('radiance_caopan', event.targets);
                                event.count = 0;
                                event.discard = [];
                                event.togain = [];
                                event.num = 0;
                                event.turn = false;
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (event.count < event.targets.length) {
                                event.current = event.targets[event.count];
                                event.current.chooseCard('he', "操盘：选择一张牌，非基本牌弃置，基本牌交给" + get.translation(player) + "，或不选择并令其摸两张牌", function(card) {
                                    return get.name(card, _status.event.player) != 'du';
                                }).set('ai', function(card) {
                                    if (get.attitude(event.current, player) > 0) return 0;
                                    var base = get.type(card) == 'basic' ? 4.5 : 5.5;
                                    return base - get.useful(card);
                                });
                            } else {
                                event.goto(5);
                            };
                            'step 3'
                            if (result.cards && result.cards.length) {
                                var card = result.cards[0];
                                if (get.type(card, event.current) == 'basic') {
                                    event.togain.add(card);
                                } else event.discard.add(card);
                            } else {
                                event.num += 1;
                            }
                            'step 4'
                            event.count++;
                            if (event.count < event.targets.length) event.goto(2);
                            'step 5'
                            var owner;
                            for (var i = 0; i < event.discard.length; i++) {
                                owner = get.owner(event.discard[i]);
                                owner.discard(event.discard[i]);
                                game.delay(0, 0.3);
                            };
                            for (var i = 0; i < event.togain.length; i++) {
                                owner = get.owner(event.togain[i]);
                                owner.give(event.togain[i], player, true);
                                game.delay(0, 0.3);
                            }
                            'step 6'
                            if (event.num > 0) player.draw(event.num * 2);
                            'step 7'
                            if (event.count > 1 && player.isDamaged()) {
                                switch (event.count) {
                                    case event.discard.length:
                                        {
                                            player.recover();
                                            break;
                                        }
                                    case event.togain.length:
                                        {
                                            player.recover();
                                            break;
                                        }
                                    case event.num:
                                        {
                                            player.recover();
                                            break;
                                        }
                                };
                            };
                            'step 8'
                            if (event.togain.length + 2 * event.num >= 3) player.turnOver();
                        },
                        ai: {
                            effect: {
                                target: function(card, player, target) {
                                    if (card.name == 'guiyoujie') return [0, 1];
                                }
                            }
                        },
                        action_tag: {
                            overall: 3,
                            draw: 3,
                            discard: 2,
                            negative: 2,
                            turnOver: 1,
                        }
                    },
                    "radiance_tunji": {
                        trigger: {
                            target: 'useCardToTargeted'
                        },
                        frequent: true,
                        filter: function(event, player) {
                            if (event.card.name != 'sha') return false;
                            if (event.player.countCards('e') > player.countCards('e')) {
                                if (player.isEmpty(1)) return true;
                                if (player.isEmpty(2)) return true;
                                if (player.isEmpty(3)) return true;
                                if (player.isEmpty(4)) return true;
                                if (player.isEmpty(5)) return true;
                            };
                            return false;
                        },
                        content: function() {
                            var card = get.cardPile(function(card) {
                                if (get.type(card) != 'equip') return false;
                                if (!player.canEquip(card, false)) return false;
                                return get.subtype(card) == 'equip2';
                            });
                            if (player.getEquip(2)) {
                                card = get.cardPile(function(card) {
                                    if (get.type(card) != 'equip') return false;
                                    if (!player.canEquip(card, false)) return false;
                                    return true;
                                });
                            };
                            if (card) {
                                player.equip(card);
                                game.updateRoundNumber();
                            }
                        },
                        ai: {
                            threaten: 1.6,
                            effect: {
                                target: function(card, player, target, current) {
                                    if (card.name == 'sha' && !player.getEquip(2)) return 0.6;
                                },
                            }
                        },
                    },
                    "radiance_guchui": {
                        unique: true,
                        zhuSkill: true,
                        trigger: {
                            player: 'damageEnd'
                        },
                        filter: function(event, player) {
                            if (!player.hasZhuSkill('radiance_guchui') || !player.isIn()) return false;
                            if (event.num < 1) return false;
                            return game.hasPlayer(function(current) {
                                return current != player && current.group == player.group && player.hasZhuSkill('radiance_guchui', current);
                            });
                        },
                        content: function() {
                            'step 0'
                            if (event.current == undefined) event.current = player.next;
                            if (event.current == player) {
                                event.finish();
                            } else if (event.current.group == player.group && player.hasZhuSkill('radiance_guchui', event.current)) {
                                event.current.chooseBool('是否受到一点伤害，令' + get.translation(player) + (player.isTurnedOver() ? "翻回正面" : "回复一点体力")).set('ai', function(event, player) {
                                    var source = event.player;
                                    if (get.attitude(player, source) <= 0) return false;
                                    if (source.isTurnedOver() && player.hp > 2) return true;
                                    if (get.damageEffect(player, player, player) < get.recoverEffect(source, player, player)) return true;
                                    if (source.hp < player.hp - 1) return true;
                                    return source.hp <= 1;
                                });
                            }
                            'step 1'
                            if (result.bool) {
                                game.log(event.current, "响应了", 'radiance_guchui');
                                event.current.addExpose(0.5);
                                event.current.damage('nosource', 'nocard');
                            } else {
                                event.current = event.current.next;
                                event.goto(0);
                            }
                            'step 2'
                            event.current.line(player, 'green');
                            if (player.isTurnedOver()) {
                                player.turnOver();
                            } else {
                                player.recover(1, event.current, 'nocard');
                            };
                        },
                    },
                    "radiance_chizi": {
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
                            if (typeof player.storage.radiance_chizi != 'boolean') player.storage.radiance_chizi = false;
                        },
                        filter: function(event, player) {
                            return (!player.storage.radiance_chizi);
                        },
                        content: function() {
                            'step 0'
                            player.awakenSkill('radiance_chizi');
                            player.addMark('radiance_chizi_af', game.roundNumber);
                            player.addSkill('radiance_chizi_af');
                            'step 1'
                            event.togain = [];
                            event.list = ['basic'];
                            event.list.push(['delay', 'damage', 'gain', 'draw', 'multitarget', 'loseCard'].randomGet());
                            event.list.push(['equip1', 'equip2'].randomGet());
                            event.count = 0;
                            'step 2'
                            if (event.count < event.list.length) {
                                var typex = event.list[event.count];
                                var card = get.cardPile(function(card) {
                                    if (get.type(card) == typex) return true;
                                    if (get.type(card) == 'equip' && get.subtype(card) == typex) return true;
                                    if (get.type(card) == 'trick' && get.tag(card, typex)) return true;
                                    return false;
                                });
                                if (card) {
                                    event.togain.push(card);
                                }
                                event.count++;
                                event.redo();
                            }
                            'step 3'
                            player.gain(event.togain, 'gain2');
                        },
                        ai: {
                            order: function(item, player) {
                                if (player.hp < 2) return 99;
                                if (player.hp == 2 && player.countCards('h') <= 2) return 20;
                                if (game.roundNumber <= 1) return 0;
                                return 4;
                            },
                            result: {
                                player: function(player) {
                                    if (player.hp <= 2 || player.countCards('h') <= 2) return 10;
                                    return 0;
                                }
                            },
                        },
                    },
                    "radiance_chizi_af": {
                        trigger: {
                            player: 'phaseZhunbeiBegin',
                        },
                        intro: {
                            content: 'mark',
                        },
                        marktext: "资",
                        charlotte: true,
                        forced: true,
                        content: function() {
                            'step 0'
                            event.togain = [];
                            event.list = ['basic', 'trick', 'equip'];
                            event.count = 0;
                            'step 1'
                            if (event.count < event.list.length) {
                                var typex = event.list[event.count];
                                var card = get.cardPile(function(card) {
                                    if (get.type2(card) == typex) return true;
                                    return false;
                                }, 'cardPile');
                                if (card) {
                                    event.togain.push(card);
                                }
                                event.count++;
                                event.redo();
                            }
                            'step 2'
                            if (event.togain.length == 3) player.removeMark('radiance_chizi_af', 1);
                            if (player.countMark('radiance_chizi_af') == 0) player.removeSkill('radiance_chizi_af');
                            'step 3'
                            player.gain(event.togain, 'gain2');
                        },
                    },

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
                            'step 0'
                            player.draw(1);
                            'step 1'
                            if (trigger.player != player) player.recover();
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
                    "radiance_douyan": {
                        enable: 'phaseUse',
                        usable: 1,
                        filterTarget: function(card, player, target) {
                            return player.canCompare(target);
                        },
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        locked: false,
                        content: function() {
                            'step 0'
                            player.chooseToCompare(target);
                            'step 1'
                            if (result.bool) {
                                player.chooseControl(['拆牌', '摸牌'], function() {
                                    if (target.countCards('he') < 1) return 1;
                                    var discard = player.needsToDiscard();
                                    if (discard > 3) return 0;
                                    if (target.countCards('he') + 1 < player.countCards('h')) return 0;
                                    if (player.countCards('e') > 1 && (discard > 0 || target.countCards('he') <= player.countCards('h'))) return 0;
                                    return 1;
                                }).set('prompt', '拆台：请选择一项').set('choiceList', [
                                    '' + get.translation(target) + '的手牌对你可见，且你可以将一张手牌当作【过河拆桥】对其使用',
                                    '使用牌指定' + get.translation(target) + '为目标后，摸一张牌',
                                ]);
                            } else {
                                target.addTempSkill('radiance_douyan_3', {
                                    player: 'phaseEnd'
                                });
                                event.finish();
                            }
                            'step 2'
                            var str = 'radiance_douyan_' + (result.index + 1);
                            player.addTempSkill(str, 'phaseUseEnd');
                            player.storage.radiance_douyan = target;
                        },
                        ai: {
                            order: 15,
                            result: {
                                player: function(player) {
                                    if (player.countCards('h', 'sha') > 0) return 0.6;
                                    var num = player.countCards('h');
                                    if (num > player.hp) return 0;
                                    if (num == 1) return -2;
                                    if (num == 2) return -1;
                                    return -0.7;
                                },
                                target: function(player, target) {
                                    var num = target.countCards('h');
                                    if (num == 1) return -1;
                                    if (num == 2) return -0.7;
                                    return -0.5
                                },
                            },
                            threaten: 1.3
                        },
                    },
                    "radiance_douyan_1": {
                        mark: true,
                        marktext: "拆",
                        intro: {
                            name: '斗艳',
                            mark: function(dialog, storage, player, skill) {
                                if (player.storage.radiance_douyan) {
                                    dialog.addAuto([player.storage.radiance_douyan]);
                                    return '' + get.translation(player.storage.radiance_douyan) + '的手牌对你可见，你可以将一张手牌当作【过河拆桥】对其使用';
                                }
                            },
                        },
                        charlotte: true,
                        enable: 'chooseToUse',
                        filterCard: function(card) {
                            return true;
                        },
                        position: 'h',
                        viewAs: {
                            name: 'guohe'
                        },
                        filterTarget: function(card, player, target) {
                            if (!player.storage.radiance_douyan || !player.storage.radiance_douyan.isIn()) return false;
                            return target == player.storage.radiance_douyan;
                        },
                        viewAsFilter: function(player) {
                            if (!player.storage.radiance_douyan || !player.storage.radiance_douyan.isIn()) return false;

                            if (!player.countCards('h')) return false;
                            return true;
                        },
                        prompt: '将一张手牌当作【过河拆桥】使用',
                        check: function(card) {
                            return 5 - get.value(card)
                        },
                        onuse: function(result, player) {
                            player.logSkill('radiance_douyan');
                        },
                        onremove: function(player, storage) {
                            delete player.storage.radiance_douyan;
                        },
                        mod: {
                            targetInRange: function(card, player, target) {
                                if (player.storage.radiance_douyan && player.storage.radiance_douyan == target) {
                                    return true;
                                }
                            },
                        },
                        ai: {
                            viewHandcard: true,
                            skillTagFilter: function(player, tag, arg) { // arg检测可以查看手牌的角色
                                if (player.storage.radiance_douyan != arg) return false;
                            },
                        },
                    },
                    "radiance_douyan_2": {
                        trigger: {
                            player: 'useCardToTargeted',
                        },
                        mark: true,
                        marktext: "摸",
                        intro: {
                            name: '斗艳',
                            mark: function(dialog, storage, player, skill) {
                                if (player.storage.radiance_douyan) {
                                    dialog.addAuto([player.storage.radiance_douyan]);
                                    return '使用牌指定' + get.translation(player.storage.radiance_douyan) + '为目标后，摸一张牌';
                                }
                            },
                        },
                        filter: function(event, player) {
                            return event.target == player.storage.radiance_douyan;
                        },
                        forced: true,
                        charlotte: true,
                        content: function() {
                            'step 0'
                            player.draw();
                        },
                        mod: {
                            targetInRange: function(card, player, target) {
                                if (player.storage.radiance_douyan && player.storage.radiance_douyan == target) {
                                    return true;
                                }
                            },
                        },
                        onremove: function(player, storage) {
                            delete player.storage.radiance_douyan;
                        },
                    },
                    "radiance_douyan_3": {
                        mark: true,
                        marktext: "跳",
                        intro: {
                            name: '斗艳',
                            mark: function(dialog, storage, player, skill) {
                                return '跳过弃牌阶段';
                            },
                        },
                        trigger: {
                            player: ['phaseDiscardBefore']
                        },
                        forced: true,
                        charlotte: true,
                        popup: false,
                        firstDo: true,
                        content: function() {
                            trigger.cancel();
                        },
                    },
                    "radiance_huanxing": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        filter: function(event, player) {
                            if (player.countCards('he', {
                                    type: 'equip',
                                }) * 2 >= player.countCards('he')) return true;
                            return false;
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
                                    } else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                                    else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                                }
                                if (list.length == 0) {
                                    return ui.create.dialog('幻形没有可用牌');
                                }
                                return ui.create.dialog('幻形', [list, 'vcard']);
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
                                var name = button.link[2];

                                if (player.countCards('h', name) > 0) return 0;

                                var evt = _status.event.getParent('chooseToUse');
                                if (evt && evt.type == 'dying') {
                                    if (evt.dying != player && get.effect(evt.dying, {
                                            name: name
                                        }, player, player) <= 0) return 0;
                                    if (evt.dying == player && name == 'jiu') return 2.1;
                                    return 2;
                                };

                                var effect = player.getUseValue(name);
                                if (effect > 0) return effect;
                                return 0;
                            },
                            backup: function(links, player) {
                                return {
                                    filterCard: function(card, player) {
                                        return get.type(card) == 'equip';
                                    },
                                    selectCard: 1,
                                    popname: true,
                                    check: function(card) {
                                        return 7.1 - get.value(card);
                                    },
                                    position: 'hes',
                                    viewAs: {
                                        name: links[0][2],
                                        nature: links[0][3]
                                    },
                                    onuse: function(result, player) {
                                        player.logSkill('radiance_huanxing');
                                    },
                                    onrespond: function(result, player) {
                                        player.logSkill('radiance_huanxing');
                                    },
                                }
                            },
                            prompt: function(links, player) {
                                return '将一张装备牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用或打出';
                            }
                        },
                        hiddenCard: function(player, name) {
                            if (player.countCards('he', {
                                    type: 'equip',
                                }) * 2 < player.countCards('he')) return false;
                            return name == 'wuxie';
                        },
                        ai: {
                            save: true,
                            respondSha: true,
                            respondShan: true,
                            skillTagFilter: function(player, tag) {
                                if (player.countCards('he', {
                                        type: 'equip',
                                    }) * 2 < player.countCards('he')) return false;
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
                        },
                    },
                    "radiance_huajian": {
                        trigger: {
                            player: 'useCardToPlayered'
                        },
                        logTarget: 'target',
                        check: function(event, player) {
                            return get.attitude(player, event.target) <= 0;
                        },
                        filter: function(event, player) {
                            return get.name(event.card, player) == 'sha' || get.name(event.card, player) == 'juedou';
                        },
                        content: function() {
                            'step 0'
                            player.judge();
                            'step 1'
                            var suit = result.suit;
                            trigger.target.showHandcards();
                            event.cards = trigger.target.getCards('h', function(card) {
                                return get.suit(card, trigger.target) == suit;
                            });
                            'step 2'
                            if (cards.length > 0) {
                                player.gain(cards, trigger.target, 'log');
                            } else {
                                player.gain(result.card, 'gain2');
                                var id = trigger.target.playerid;
                                var map = trigger.getParent().customArgs;
                                if (!map[id]) map[id] = {};
                                if (typeof map[id].extraDamage != 'number') {
                                    map[id].extraDamage = 0;
                                }
                                map[id].extraDamage++;
                            };
                        },
                    },
                    "radiance_yueyin": {
                        trigger: {
                            global: ['loseAfter'],
                        },
                        filter: function(event, player) {
                            if (event.type != 'discard') return false;
                            var evt = event.getParent('radiance_yueyin', true);
                            if (evt) return false;

                            var cards = event.cards2 || event.cards;
                            if (!cards) return false;
                            cards = cards.filterInD('d');
                            for (var i = 0; i < cards.length; i++) {
                                if (get.suit(cards[i]) == 'heart' || get.type(cards[i]) == 'equip') return true;
                            };
                            return false;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            var cards = trigger.cards2 || trigger.cards;
                            event.cards = cards.filterInD('od');
                            event.cards = event.cards.filter(function(card) {
                                return get.suit(card) == 'heart' || get.type(card) == 'equip';
                            });
                            player.chooseCardTarget({
                                filterCard: function(card, player) {
                                    return lib.filter.cardDiscardable(card, player, _status.event);
                                },
                                filterTarget: function(card, player, target) {
                                    var trigger = _status.event.getTrigger();
                                    return target != trigger.player;
                                },
                                selectCard: 1,
                                position: 'he',
                                ai1: function(card) {
                                    var cards = _status.event.getParent().cards;
                                    return get.value(cards) - get.value(card);
                                },
                                ai2: function(target) {
                                    var att = get.attitude(_status.event.player, target);
                                    var cards = _status.event.getParent().cards;
                                    return (att - 1) * get.value(cards, target);
                                },
                                prompt: "月吟：是否弃置一张牌并令一名角色获得" + get.translation(event.cards) + "？",
                            });
                            'step 1'
                            if (result.bool) {
                                event.target = result.targets[0];
                                player.logSkill('radiance_yueyin', event.target);
                                player.discard(result.cards);
                            } else {
                                event.finish();
                            };
                            'step 2'
                            target.gain(event.cards, 'gain2');
                            event.cards.sort(function(a, b) {
                                return target.getUseValue(b) - target.getUseValue(a);
                            });
                            'step 3'
                            if (event.cards.length > 0) {
                                var card = event.cards.shift();
                                if (get.type(card) == 'equip' && event.target.canEquip(card, true)) {
                                    event.target.chooseUseTarget("是否装备" + get.translation(card) + "？", card, false);
                                };
                                event.redo();
                            };
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
                    "radiance_lizhan": {
                        init: function(player) {
                            player.storage.radiance_lizhan = 0;
                        },
                        marktext: "历",
                        intro: {
                            content: "下一次触发【历战】时额外展示#张牌",
                        },
                        trigger: {
                            player: 'phaseDrawBegin2'
                        },
                        filter: function(event, player) {
                            return !event.numFixed;
                        },
                        check: function() {
                            return true;
                        },
                        prompt: function(event, player) {
                            return "是否放弃摸牌，改为展示并从牌堆顶的" + get.cnNumber(3 + player.storage.radiance_lizhan) + "张牌中获得牌？";
                        },
                        content: function() {
                            'step 0'
                            trigger.changeToZero();
                            event.num = 3 + player.storage.radiance_lizhan;
                            var cards = get.cards(event.num);
                            game.cardsGotoOrdering(cards);
                            player.showCards(cards, '历战');
                            game.delay(1.2);
                            event.cards = cards;
                            'step 1'
                            event.basic = [];
                            event.trick = [];
                            var val1 = 0,
                                val2 = 0;
                            for (var i = 0; i < event.cards.length; i++) {
                                if (get.type2(event.cards[i]) == 'trick') {
                                    event.trick.push(event.cards[i]);
                                    val2 += get.value(event.cards[i]);
                                } else {
                                    event.basic.push(event.cards[i]);
                                    val1 += get.value(event.cards[i]);
                                }
                            }
                            var str1 = event.basic.length > 0 ? "获得" + get.translation(event.basic) : "没有基本和装备牌可以获得";
                            var str2 = event.trick.length > 0 ? "获得" + get.translation(event.trick) : "没有锦囊牌可以获得";
                            player.chooseControl("基本和装备", "锦囊").set('ai', function() {
                                if (val2 > val1) return "锦囊";
                                return "基本和装备";
                            }).set('choiceList', [str1, str2]);
                            'step 2'
                            if (result.control == "基本和装备") {
                                if (event.basic.length) player.gain(event.basic, 'gain2');
                                event.give = event.trick;
                            } else {
                                if (event.trick.length) player.gain(event.trick, 'gain2');
                                event.give = event.basic;
                            }
                            'step 3'
                            if (event.give.length) {
                                var str = "是否令一名其他角色获得" + get.translation(event.give) + "？";
                                player.chooseTarget(str, lib.filter.notMe).set('ai', function(target) {
                                    var att = get.attitude(player, target);
                                    var val = 0;
                                    for (var i = 0; i < _status.event.cards.length; i++) {
                                        val += get.value(_status.event.cards[i], target);
                                    }
                                    if (val > 0 && att <= 0) return 0;
                                    if (val < 0 && att > 0) return 0;
                                    return val * att;
                                }).set('cards', event.give);
                            } else {
                                event.goto(5);
                            }
                            'step 4'
                            if (result.bool && result.targets.length) {
                                result.targets[0].gain(event.give, player, 'gain2');
                            }
                            'step 5'
                            if (player.storage.radiance_lizhan > 0) {
                                player.storage.radiance_lizhan = 0;
                                player.unmarkSkill('radiance_lizhan');
                            }
                        },
                        group: 'radiance_lizhan_add',
                        subSkill: {
                            add: {
                                trigger: {
                                    global: 'useCardAfter',
                                },
                                filter: function(event, player) {
                                    if (!get.tag(event.card, 'damage')) return false;
                                    if (event.target && event.target == player) return true;
                                    return event.targets && event.targets.contains(player);
                                },
                                forced: true,
                                silent: true,
                                popup: false,
                                sub: true,
                                content: function() {
                                    player.storage.radiance_lizhan++;
                                    player.markSkill('radiance_lizhan');
                                },
                            },
                        },
                        action_tag: {
                            overall: 3.5,
                            draw: 1,
                            support: 1,
                            search: 0.5,
                        },
                    },
                    "radiance_nuyong": {
                        locked: true,
                        shaRelated: true,
                        mod: {
                            cardUsable: function(card, player, num) {
                                if (card.name == 'sha') {
                                    var type = [];
                                    player.getHistory('useCard', function(evt) {
                                        type.add(get.type2(evt.card))
                                        return evt.isPhaseUsing();
                                    });
                                    return num + type.length;
                                }
                            },
                            globalFrom: function(from, to, distance) {
                                var type = [];
                                from.getHistory('useCard', function(evt) {
                                    type.add(get.type2(evt.card))
                                    return evt.isPhaseUsing();
                                });
                                return distance - type.length;
                            },
                        },
                        action_tag: {
                            overall: 1,
                            sha_multi: 1,
                        },
                    },
                    "radiance_mingke": {
                        enable: 'chooseToUse',
                        usable: 1,
                        filter: function(event, player) {
                            if (!player.storage.radiance_mingke || player.storage.radiance_mingke.length == 0) return false;
                            return event.type == 'phase' && player.countCards('hs', {
                                color: 'black',
                            }) > 0;
                        },
                        chooseButton: {
                            dialog: function(event, player) {
                                var list = [];
                                var history = player.storage.radiance_mingke;

                                for (var i = 0; i < history.length; i++) {
                                    var name = history[i];
                                    var nature;
                                    if (name.indexOf('sha') == 0 && name.length > 3) {
                                        nature = name.substring(3);
                                        name = 'sha';
                                    }
                                    var type = get.type(name);
                                    list.add([type, '', name, nature]);
                                }
                                return ui.create.dialog('铭刻', [list, 'vcard']);
                            },
                            filter: function(button, player) {
                                var evt = _status.event.getParent();
                                return evt.filterCard({
                                    name: button.link[2]
                                }, player, evt);
                            },
                            check: function(button) {
                                var player = _status.event.player;
                                if (player.countCards('hs', button.link[2]) > 0) return 0;
                                if (button.link[2] == 'wugu') return 0;
                                var effect = player.getUseValue(button.link[2]);
                                if (effect > 0) return effect;
                                return 0;
                            },
                            backup: function(links, player) {
                                return {
                                    filterCard: function(card, player) {
                                        return get.color(card) == 'black';
                                    },
                                    selectCard: 1,
                                    popname: true,
                                    check: function(card) {
                                        return get.value(links[0][2]) - get.value(card);
                                    },
                                    position: 'hs',
                                    viewAs: {
                                        name: links[0][2],
                                        nature: links[0][3]
                                    },
                                    onuse: function(result, player) {
                                        player.logSkill('radiance_mingke');
                                    },
                                }
                            },
                            prompt: function(links, player) {
                                return '将一张黑色手牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
                            },
                        },
                        ai: {
                            order: 1,
                            result: {
                                player: function(player) {
                                    return 1;
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
                        },
                        global: 'radiance_mingke_record',
                        subSkill: {
                            record: {
                                trigger: {
                                    player: 'useCardBegin',
                                },
                                firstDo: true,
                                charlotte: true,
                                forced: true,
                                silent: true,
                                filter: function(event, player) {
                                    return get.type(event.card) == 'basic' || get.type(event.card) == 'trick';
                                },
                                content: function() {
                                    if (!Array.isArray(player.storage.radiance_mingke)) player.storage.radiance_mingke = [];
                                    var name = get.name(trigger.card, player),
                                        nature = get.nature(trigger.card, player);
                                    if (nature) name = name + nature;
                                    player.storage.radiance_mingke.add(name);
                                },
                            },
                        },
                    },
                    "radiance_kongzhi": {
                        trigger: {
                            player: ['phaseDiscardEnd'],
                        },
                        filter: function(event, player) {
                            var cards = [];
                            event.player.getHistory('lose', function(evt) {
                                if (evt && evt.getParent('phaseDiscard') == event && evt.hs) cards.addArray(evt.hs);
                            });
                            return cards.length >= 0;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            var cards = [];
                            trigger.player.getHistory('lose', function(evt) {
                                if (evt && evt.getParent('phaseDiscard') == trigger && evt.hs) cards.addArray(evt.hs);
                            });
                            event.count = cards.length;
                            'step 1'
                            var str = "空值：选择一名其他角色，";
                            str += event.count > 0 ? "弃置其一张牌（还可以弃置" + get.cnNumber(event.count) + "张）" : "令其弃置一张牌";
                            player.chooseTarget(str).set('filterTarget', function(card, player, target) {
                                return target != player && target.countCards(_status.event.pos) > 0;
                            }).set('ai', function(target) {
                                var att = get.attitude(player, target);

                                if (att > 1 && target.countCards('j') > 0 && _status.event.pos == 'hej') return 10 * att;
                                return -att / (target.countCards('he') + 0.1);

                            }).set('pos', event.count > 0 ? 'hej' : 'he');
                            'step 2'
                            if (result.bool && result.targets.length) {
                                player.logSkill('radiance_kongzhi', result.targets[0]);

                                if (event.count > 0) {
                                    player.discardPlayerCard(result.targets[0], true, 'hej', 1);
                                } else {
                                    result.targets[0].chooseToDiscard('he', 1, true);
                                    event.finish();
                                }
                            } else {
                                event.finish();
                            }
                            'step 3'
                            event.count -= 1;
                            if (event.count > 0) {
                                event.goto(1);
                            } else {
                                event.finish();
                            }
                        },
                        action_tag: {
                            overall: 1,
                            discard: 1,
                        },
                    },



                    // cchurch
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
                            effect: {
                                target: function(card, player, target) {
                                    if (get.tag(card, 'damage')) {
                                        if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                        if (!target.hasFriend()) return;
                                        var num = 1;
                                        if (get.attitude(player, target) > 0) {
                                            if (player.needsToDiscard()) {
                                                num = 0.7;
                                            } else {
                                                num = 0.5;
                                            };
                                        };
                                        var base = 2;
                                        if (['zhu', 'bZhu', 'rZhu'].contains(player.identity)) base++;
                                        if (target.hp > base) return [1, num * 1.5];
                                        if (target.hp == base) return [1, num * 0.5];
                                    };
                                },
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
                                dialog.add("获得" + get.cnNumber(event.suits.length) + "张牌并放弃摸牌，或将此阶段改为摸" + get.cnNumber(event.suits.length) + "张牌");
                                dialog.add(cards);

                                var num = Math.min(ui.cardPile.childNodes.length, event.suits.length);
                                var val = 0;
                                for (var i = 0; i < num; i++) {
                                    val += get.value(ui.cardPile.childNodes[i]);
                                };
                                if (num == 0) {
                                    val = 4.5 * event.suits.length;
                                } else if (num < event.suits.length) {
                                    val = event.suits.length / num * val;
                                };
                                player.chooseButton(dialog, event.suits.length).set('ai', function(button) {
                                    var card = button.link;
                                    if (ui.selected.buttons.length < _status.event.num - 1) return get.value(card);
                                    var val = 0;
                                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                                        val += get.value(ui.selected.buttons[i].link);
                                    };
                                    return get.value(card) + val - _status.event.value;
                                }).set('value', val).set('num', event.suits.length);
                            };
                            'step 4'
                            if (result.bool) {
                                player.gain(result.links, 'gain2');
                                trigger.changeToZero();
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
                            player.chooseControl(['选项一', '选项二', 'cancel2'], function(event, player) {
                                if (player.hp <= 1) return 1;
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
                                player.gain(result.target, 'gain2', 'log');
                                if (trigger.cards && trigger.cards.filterInD('od').length) player.gain(trigger.cards.filterInD('od'), 'gain2', 'log');
                            }
                        },
                    },
                    "radiance_dianlu": {
                        trigger: {
                            global: ['useCard', 'respond'],
                        },
                        filter: function(event, player) {
                            return event.card.name == 'shan' && (get.distance(player, event.player) <= 1 || event.player == player) && player.getHistory('custom', function(evt) {
                                return evt.radiance_dianlu;
                            }).length < Math.max(player.getDamagedHp(), 1);
                        },
                        frequent: true,
                        locked: false,
                        content: function() {
                            player.draw();
                            player.getHistory('custom').push({
                                radiance_dianlu: true,
                            });
                        },
                        mod: {
                            globalFrom: function(from, to, distance) {
                                return distance - Math.max(from.getDamagedHp(), 1);
                            }
                        },
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
                                return target != player && player.inRange(target) && player.getHistory('custom', function(evt) {
                                    return evt.radiance_dizui == target;
                                }).length == 0;
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
                                player.getHistory('custom').push({
                                    radiance_dizui: event.target,
                                });
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
                                if (player.getHistory('custom', function(evt) {
                                        return evt.radiance_dizui;
                                    }).length > 99) event.target.addTempSkill('radiance_forbid');
                            } else {
                                event.finish();
                            };
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
                                            return get.attitude(player, targetx) < 0 && target.inRange(targetx);
                                        })) return;

                                    if (_status.currentPhase == target) return;
                                    if (card.name != 'shuiyanqijunx' && get.tag(card, 'loseCard') && target.countCards('he')) {
                                        return [0.7, 1];
                                    }
                                    if (get.tag(card, 'respondSha') || get.tag(card, 'respondShan')) {
                                        if (get.attitude(player, target) > 0 && card.name == 'juedou') return;
                                        if (get.tag(card, 'damage') && target.hasSkillTag('maixie')) return;
                                        if (target.countCards('h') == 2) return [2, -2];
                                        if (target.countCards('h') <= 1) return 3;
                                        if (get.mode() == 'guozhan') return 0.5;
                                        return [0.7, Math.min((target.countCards('he') - 2) / 4, 0.5)];
                                    }
                                }
                            },
                            threaten: function(player, target) {
                                if (target.countCards('h') <= 1) return 3;
                                return 0.8;
                            },
                            nodiscard: true,
                            nolose: true,
                            noe: true,
                            noh: true,
                        },
                    },
                    "radiance_suzheng": {
                        trigger: {
                            global: ['phaseUseBefore'],
                        },
                        init: function(player) {
                            if (!player.storage.radiance_suzheng) player.storage.radiance_suzheng = [];
                        },
                        marktext: "肃",
                        intro: {
                            mark: function(dialog, content, player, storage, skill) {
                                if (player.hasSkill('radiance_suzheng_used') || !player.storage.radiance_suzheng) return '“肃正”不可用';
                                dialog.addAuto(player.storage.radiance_suzheng);
                            },
                            onunmark: function(storage, player) {
                                if (storage && storage.length) {
                                    player.$throw(storage, 1000);
                                    game.cardsDiscard(storage);
                                    game.log(storage, '被置入了弃牌堆');
                                    storage.length = 0;
                                }
                            },
                        },
                        onremove: function(player) {
                            if (player.storage.radiance_suzheng.length) {
                                player.$throw(player.storage.radiance_suzheng, 1000);
                                game.log(player.storage.radiance_suzheng, '被置入了弃牌堆');
                                game.cardsDiscard(player.storage.radiance_suzheng);
                                player.storage.radiance_suzheng = [];
                                player.unmarkSkill('radiance_suzheng');
                            }
                        },
                        filter: function(event, player) {
                            if (event.player == player) return false;
                            return !player.hasSkill('radiance_suzheng_used');
                        },
                        check: function(event, player) {
                            return get.attitude(player, event.player) < 0 && !event.player.hasSkill('nodamage');
                        },
                        prompt2: function(event, player) {
                            var suits = [];
                            for (var i = 0; i < player.storage.radiance_suzheng.length; i++) {
                                suits.add(get.suit(player.storage.radiance_suzheng[i]));
                            }
                            var str = suits.length > 0 ? "将一张花色不为" + get.translation(suits) + "的" : "将一张";
                            return '令' + get.translation(event.player) + str + '手牌置于你的武将牌上';
                        },
                        logTarget: 'player',
                        content: function() {
                            'step 0'
                            var suits = [];
                            for (var i = 0; i < player.storage.radiance_suzheng.length; i++) {
                                suits.add(get.suit(player.storage.radiance_suzheng[i]));
                            }
                            var str = suits.length > 0 ? "将一张花色不为" + get.translation(suits) + "的" : "将一张";
                            str += "手牌置于" + get.translation(player) + "的武将牌上";
                            trigger.player.chooseCard(1, 'h', str, function(card) {
                                return !_status.event.suits.contains(get.suit(card));
                            }).set('ai', function(card) {
                                if (trigger.player.hasSkillTag('nodamage')) return 0;
                                if (player.storage.radiance_suzheng.length > 2 && trigger.player.hp > 2 && _status.event.att > 0) return 0;
                                if (trigger.player.hp < 2) {
                                    return 8.1 - get.value(card)
                                }
                                return 6.1 - get.value(card);
                            }).set('suits', suits).set('att', get.attitude(trigger.player, player));
                            'step 1'
                            if (result.bool && result.cards.length) {
                                trigger.player.$give(result.cards, player, false);
                                trigger.player.lose(result.cards, ui.special, 'toStorage');
                                player.storage.radiance_suzheng = player.storage.radiance_suzheng.concat(result.cards);
                                player.syncStorage('radiance_suzheng');
                                player.markSkill('radiance_suzheng');
                                game.log(player, '将', result.cards, '置于武将牌上');
                                event.finish();
                            } else {
                                if (player.storage.radiance_suzheng.length > 0) {
                                    trigger.player.gain(player.storage.radiance_suzheng, 'giveAuto', 'log', 'fromStorage', player);
                                    player.storage.radiance_suzheng = [];
                                    player.syncStorage('radiance_suzheng');
                                    player.unmarkSkill('radiance_suzheng');
                                }
                                player.addTempSkill('radiance_suzheng_used', {
                                    player: 'phaseBefore',
                                });
                            }
                            'step 2'
                            trigger.player.damage(player, 'nocard');
                            trigger.cancel();
                            trigger.skipped = true;
                            trigger.player.getHistory('skipped').add('phaseUse');
                            trigger.player.skipList.add('phaseDiscard');
                        },
                        group: ["radiance_suzheng_reset"],
                        subSkill: {
                            reset: {
                                trigger: {
                                    player: 'phaseZhunbeiBegin'
                                },
                                filter: function(event, player) {
                                    return player.storage.radiance_suzheng.length > 0;
                                },
                                prompt2: function(event, player) {
                                    return "移去所有“肃正”牌？";
                                },
                                check: function(event, player) {
                                    return player.storage.radiance_suzheng.length > 1;
                                },
                                content: function() {
                                    player.unmarkSkill('radiance_suzheng');
                                },
                            },
                            used: {
                                charlotte: true,
                            },
                        },
                        ai: {
                            expose: 0.3,
                        },
                        action_tag: {
                            overall: 4,
                            damage: 1,
                            discard: 1.5,
                            out: 1,
                        },
                    },
                    "radiance_xinxiang": {
                        trigger: {
                            target: 'useCardToPlayered',
                        },
                        filter: function(event) {
                            return get.type(event.card) == 'trick';
                        },
                        frequent: true,
                        content: function() {
                            'step 0'
                            event.cards = get.cards(2);
                            game.cardsGotoOrdering(event.cards);
                            'step 1'
                            player.chooseButton(['心象：请选择要获得的牌', event.cards], 1, true).set('ai', function(button) {
                                var card = button.link;
                                var val = get.value(card);
                                return val;
                            });
                            'step 2'
                            if (result.links && result.links.length) {
                                event.cards.remove(result.links[0]);
                                player.gain(result.links[0], 'draw2');
                                event.card = event.cards[0];

                                game.log(player, '将', event.card, '置于牌堆顶');
                                game.broadcastAll(function(player) {
                                    var cardx = ui.create.card();
                                    cardx.classList.add('infohidden');
                                    cardx.classList.add('infoflip');
                                    player.$throw(cardx, 1000, 'nobroadcast');
                                }, player);
                            } else {
                                event.finish();
                            }
                            'step 3'
                            event.card.fix();
                            ui.cardPile.insertBefore(event.card, ui.cardPile.firstChild);
                            game.updateRoundNumber();
                        },
                        action_tag: {
                            overall: 3,
                            draw: 1,
                            active_defend: 1,
                        },
                    },
                    "radiance_haoai": {
                        trigger: {
                            global: 'damageBefore',
                        },
                        filter: function(event, player) {
                            return event.num > 0 && player.hp > event.num;
                        },
                        check: function(event, player) {
                            if (get.attitude(player, event.player) < 1) return 0;
                            if (get.mode() == 'identity' && _status.mode != 'purple') {
                                if (['zhong', 'mingzhong'].contains(player.identity) && event.player.identity == 'zhu') return (event.player.hp <= player.hp);
                            }
                            return (event.player == player || event.player.hp < player.hp);
                        },
                        logTarget: 'player',
                        content: function() {
                            'step 0'
                            player.loseHp(trigger.num);
                            'step 1'
                            trigger.cancel();
                            trigger.player.addTempSkill('radiance_wudi');
                            'step 2'
                            trigger.player.draw(trigger.num, player);
                        },
                        ai: {
                            threaten: 2.5,
                        },
                        action_tag: {
                            overall: 4,
                            draw: 1,
                            loseHp_defend: 3,
                            damage_prevent: 1,
                        },
                    },
                    "radiance_yangzhu": {
                        enable: 'phaseUse',
                        usable: 1,
                        filter: function(event, player) {
                            return game.hasPlayer(function(current) {
                                return lib.skill.radiance_yangzhu.filterTarget(null, player, current);
                            });
                        },
                        filterTarget: function(card, player, target) {
                            if (target == player) return false;
                            var num = player.countCards('h');
                            if (player.hasZhuSkill('radiance_youguo', player)) {
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i] == player) continue;
                                    if (player.hasZhuSkill('radiance_youguo', game.players[i]) && player.group == game.players[i].group) num--;
                                };
                            };
                            if (num < 0) num = 0;
                            return target.countCards('h') > num;
                        },
                        selectTarget: -1,
                        multitarget: true,
                        multiline: true,
                        content: function() {
                            'step 0'
                            event.targets = targets.slice(0);
                            event.targets.sort(lib.sort.seat);
                            'step 1'
                            if (event.targets.length) {
                                var target = event.targets.shift();
                                target.chooseToDiscard('h', "弃置一张手牌，或令" + get.translation(player) + "摸一张牌").set('ai', function(card) {
                                    if (get.attitude(target, player) > 0) return 0;
                                    return 6 - get.useful(card);
                                });
                            } else {
                                event.goto(3);
                            }
                            'step 2'
                            if (!result.bool) {
                                player.draw();
                            }
                            event.goto(1);
                            'step 3'
                            var bool = true;
                            var num = player.countCards('h');
                            if (player.hasZhuSkill('radiance_youguo', player)) {
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i] == player) continue;
                                    if (player.hasZhuSkill('radiance_youguo', game.players[i]) && player.group == game.players[i].group) num--;
                                };
                            };
                            if (num < 0) num = 0;
                            for (var i = 0; i < game.players.length; i++) {
                                if (game.players[i].isOut() || game.players[i] == player) continue;
                                if (game.players[i].countCards('h') > num) {
                                    bool = false;
                                    break;
                                };
                            };
                            if (bool) {
                                var evt = event.getParent('phaseUse', true);
                                if (evt && evt.player == player && !evt.skipped) evt.skipped = true;
                            };
                        },
                        ai: {
                            order: 0.5,
                            result: {
                                player: 1,
                            },
                        },
                        action_tag: {
                            overall: 3.5,
                            in: 1,
                            draw: 2.5,
                            negative: 0.5,
                            maxHand: 1,
                        },
                    },
                    "radiance_youguo": {
                        unique: true,
                        zhuSkill: true,
                        mod: {
                            maxHandcardBase: function(player, num) {
                                var num2 = 0;
                                if (player.hasZhuSkill('radiance_youguo', player)) {
                                    for (var i = 0; i < game.players.length; i++) {
                                        if (game.players[i] == player) continue;
                                        if (player.hasZhuSkill('radiance_youguo', game.players[i]) && player.group == game.players[i].group) num2++;
                                    };
                                };
                                return num + num2;
                            },
                        },
                    },
                    "radiance_kaicheng": {
                        trigger: {
                            player: 'phaseUseBegin',
                        },
                        content: function() {
                            'step 0'
                            if (!player.storage.radiance_kaicheng) player.storage.radiance_kaicheng = [];
                            player.addTempSkill('radiance_kaicheng_view');
                            event.targets = game.filterPlayer(function(target) {
                                return target != player;
                            });
                            event.targets = get.sort(event.targets, 'seat', player);
                            'step 1'
                            if (event.targets.length == 0) event.finish();
                            'step 2'
                            event.current = event.targets.shift();
                            event.current.chooseBool("是否展示所有手牌？不展示则本回合不能再使用或打出牌").set('ai', function(event, player) {
                                if (player.countCards('h') == 0) return true;
                                if (get.attitude(player, event.player) > 0) return false;
                                if (player.hasSkillTag('forbid_card') || player.hp >= 3) return false;
                                return true;
                            })
                            'step 3'
                            if (result.bool) {
                                event.current.showHandcards();
                                player.storage.radiance_kaicheng.add(event.current);
                                game.delay();
                            } else {
                                event.current.addTempSkill('radiance_forbid');
                            };
                            event.goto(1);
                        },
                        subSkill: {
                            view: {
                                locked: true,
                                charlotte: true,
                                ai: {
                                    viewHandcard: true,
                                    skillTagFilter: function(player, tag, arg) {
                                        if (player.storage.radiance_kaicheng && player.storage.radiance_kaicheng.contains(arg)) return;
                                        return false;
                                    },
                                },
                                onremove: function(player, skill) {
                                    delete player.storage.radiance_kaicheng;
                                },
                            },
                        },
                    },
                    "radiance_chuhai": {
                        enable: 'phaseUse',
                        usable: 1,
                        filterTarget: function(card, player, target) {
                            return target != player && target.getDiscardableCards(player, 'he').length > 0;
                        },
                        filterCard: true,
                        position: 'he',
                        check: function(card) {
                            return 5.1 - get.value(card);
                        },
                        content: function() {
                            'step 0'
                            player.discardPlayerCard(target, 'he', [1, 2], "弃置目标角色至多两张牌", true).set('ai', function(button) {
                                var player = _status.event.player;
                                var target = _status.event.target;
                                var val = get.buttonValue(button);
                                if (get.attitude(player, target) > 0) return -val;
                                if (ui.selected.buttons.length > 0) {
                                    var color = get.color(ui.selected.buttons[0].link, target);
                                    var isVisible = _status.event.visible || target.isUnderControl(true, player) || player.hasSkillTag('viewHandcard', null, target, true);
                                    var effect = get.effect(target, {
                                        name: 'sha',
                                    }, player, player);
                                    if (effect > 0) {
                                        if ((isVisible || get.position(button.link) != 'h') && get.color(button.link, target) == color) return 1.5 * val;
                                    } else if (effect < 0) {
                                        if ((isVisible || get.position(button.link) != 'h')) {
                                            if (get.color(button.link, target) != color) return 1.5 * val;
                                            return 0;
                                        };
                                    };
                                };
                                return val;
                            });
                            'step 1'
                            if (result.bool) {
                                for (var i = 0; i < result.cards.length - 1; i++) {
                                    var card = result.cards[i];
                                    if (get.color(card, target) != 'red' && get.color(card, target) != 'black') continue;
                                    for (var j = i + 1; j < result.cards.length; j++) {
                                        if (get.color(card, target) != get.color(result.cards[j], target)) {
                                            event.finish();
                                            break;
                                        };
                                    };
                                };
                            };
                            'step 2'
                            if (lib.filter.targetEnabled2({
                                    name: 'sha',
                                }, player, target)) {
                                player.useCard({
                                    name: 'sha'
                                }, target).set('addCount', false);
                            };
                            'step 3'
                            if (target.isIn() && target.getHistory('damage', function(evt) {
                                    return evt.getParent().name == 'sha' && evt.getParent(3) == event;
                                }).length > 0) {
                                target.draw(1, player);
                            };
                        },
                        ai: {
                            order: 7,
                            result: {
                                target: function() {
                                    return -1;
                                },
                            },
                        },
                    },
                    "radiance_junheng": {
                        trigger: {
                            player: 'damageEnd',
                        },
                        filter: function(event, player) {
                            return event.num > 0
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            event.count = trigger.num;
                            'step 1'
                            event.count--;
                            player.chooseTarget(1, get.prompt2('radiance_junheng'), function(card, player, target) {
                                return target.getHandcardLimit() != target.countCards('h');
                            }).set('ai', function(target) {
                                var player = _status.event.player;
                                var num = target.getHandcardLimit() - target.countCards('h');
                                if (num > 4) num = 4;
                                else if (num < -4) num = -4;
                                return num * get.attitude(player, target);
                            });
                            'step 2'
                            if (result.bool && result.targets.length) {
                                var target = result.targets[0];
                                player.logSkill('radiance_junheng', target);
                                var num = target.getHandcardLimit() - target.countCards('h');
                                if (num > 4) {
                                    num = 4;
                                } else if (num < -4) num = -4;
                                if (num > 0) {
                                    target.draw(num, player);
                                } else {
                                    target.chooseToDiscard((0 - num), 'h', true);
                                };
                            };
                            'step 3'
                            if (event.count > 0) event.goto(1);
                        },
                    },

                    "radiance_yingling": {
                        trigger: {
                            player: 'damageBegin4',
                            source: 'damageBegin1',
                        },
                        mark: true,
                        intro: {
                            mark: function(dialog, content, player, storage, skill) {
                                if (player.storage.radiance_yingling) {
                                    dialog.addText("下一次增加伤害时需弃置" + get.cnNumber(player.storage.radiance_yingling.add) + "张牌");
                                    dialog.addText("下一次防止伤害时需弃置" + get.cnNumber(player.storage.radiance_yingling.minus) + "张牌");
                                };
                            },
                        },
                        init: function(player, skill) {
                            if (!player.storage.radiance_yingling) player.storage.radiance_yingling = {
                                add: 1,
                                minus: 1,
                            };
                        },
                        filter: function(event, player, name) {
                            var type = name == 'damageBegin1' ? 'add' : 'minus';
                            if (!player.storage.radiance_yingling) player.storage.radiance_yingling = {
                                add: 1,
                                minus: 1,
                            };
                            if (player.countCards('he') < player.storage.radiance_yingling[type] || event.num <= 0 || !event.player.isIn()) return false;
                            return true;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            var type = event.triggername == 'damageBegin1' ? 'add' : 'minus';
                            var num = player.storage.radiance_yingling[type];
                            var dialog = ui.create.dialog("英灵");
                            var str = event.triggername == 'damageBegin1' ? "是否弃置" + get.cnNumber(num) + "张牌对" + get.translation(trigger.player) + "额外造成一点伤害？" : "是否弃置" + get.cnNumber(num) + "张牌来防止" + (trigger.source ? get.translation(trigger.source) + "对你的" : "此") + "伤害？";
                            dialog.addText(str);
                            player.chooseToDiscard(dialog, 'he', num).set('ai', function(card) {
                                var trigger = _status.event.getTrigger();
                                var type = _status.event.getParent().triggername == 'damageBegin1' ? 'add' : 'minus';
                                var player = _status.event.player;
                                var num = player.storage.radiance_yingling[type];
                                var base = 7;
                                if (type == 'add') {
                                    if (get.damageEffect(trigger.player, player, player) < 1) return -1;
                                    if (trigger.player.hasSkillTag('noextra') || trigger.player.getEquip('baiyin')) return -1;
                                    if (num > 2) base--;
                                };
                                if (type == 'minus') {
                                    if (get.tag(card, 'save')) return -1;
                                    if ((['wuxie', 'shan'].contains(get.name(card, player)) || get.subtype(card) == 'equip2') && player.hp > trigger.num) return -1;
                                    if (trigger.num > 1) base += 3 + trigger.num - num;
                                    if (player.hp <= 1 && !player.countCards('hs', function(cardx) {
                                            return get.tag(cardx, 'save');
                                        }) && !player.hasSkillTag('save')) base += 2;
                                };
                                return base - num - get.value(card);
                            });
                            'step 1'
                            if (result.bool) {
                                if (event.triggername == 'damageBegin1') {
                                    player.logSkill('radiance_yingling', trigger.player);
                                    player.storage.radiance_yingling.add++;
                                    trigger.num++;
                                } else {
                                    player.logSkill('radiance_yingling');
                                    player.storage.radiance_yingling.minus++;
                                    trigger.cancel();
                                };
                                player.markSkill('radiance_yingling');
                            };
                        },
                        global: 'radiance_yingling_clear',
                        subSkill: {
                            clear: {
                                trigger: {
                                    global: 'dieAfter',
                                    player: 'damageAfter',
                                },
                                filter: function(event, player) {
                                    if (event.name == 'die' && event.source != player) return false;
                                    if (event.name == 'damage' && event.num < 1) return false;
                                    return player.storage.radiance_yingling;
                                },
                                silent: true,
                                firstDo: true,
                                popup: false,
                                forced: true,
                                content: function() {
                                    if (trigger.name == 'die') {
                                        player.storage.radiance_yingling.add = 1;
                                    } else {
                                        player.storage.radiance_yingling.minus = 1;
                                    };
                                    player.markSkill('radiance_yingling');
                                },
                            },
                        },
                        ai: {
                            noextra: true,
                        },
                    },
                    "radiance_tianshu": {
                        mod: {
                            maxHandcardFinal: function(player, num) {
                                var max = 2;
                                var targets = game.filterPlayer(function(current) {
                                    max = Math.max(max, current.hp);
                                    return !current.hasSkill('radiance_tianshu');
                                });
                                max = Math.min(5, max);
                                return Math.max(num, max);
                            },
                        },
                        trigger: {
                            player: 'phaseBegin',
                        },
                        filter: function(event, player) {
                            var max = 2;
                            var targets = game.filterPlayer(function(current) {
                                max = Math.max(max, current.hp);
                                return !current.hasSkill('radiance_tianshu');
                            });
                            max = Math.min(5, max);
                            return max > player.countCards('h');
                        },
                        forced: true,
                        firstDo: true,
                        content: function() {
                            'step 0'
                            var max = 2;
                            var targets = game.filterPlayer(function(current) {
                                max = Math.max(max, current.hp);
                                return !current.hasSkill('radiance_tianshu');
                            });
                            max = Math.min(5, max);
                            var num = max - player.countCards('h');
                            player.draw(num);
                            if (num > 2) player.skipList.add('phaseDraw');
                        },
                    },
                    "radiance_huiwang": {
                        trigger: {
                            global: 'useCardToTargeted'
                        },
                        filter: function(event, player) {
                            if (!event.radiance_huiwang) return false;
                            var target = event.target;
                            if (!target.storage.radiance_huiwang || !target.storage.radiance_huiwang.count) return false;
                            var num = target.hp;
                            if (num <= target.storage.radiance_huiwang.count) {
                                if (target == player) return true;
                                if (!Array.isArray(target.storage.radiance_huiwang.source)) return true;
                                return !target.storage.radiance_huiwang.source.contains(player);
                            };
                            return false;
                        },
                        check: function(event, player) {
                            if (player.getCards('he', function(card) {
                                    return get.value(card, event.target) <= 0;
                                }).length > 0 && get.attitude(player, event.target) <= 0) return true;
                            return get.attitude(player, event.target) > 0;
                        },
                        logTarget: 'target',
                        content: function() {
                            'step 0'
                            if (!trigger.target.storage.radiance_huiwang.source) trigger.target.storage.radiance_huiwang.source = [];
                            trigger.target.storage.radiance_huiwang.source.add(player);
                            if (!player.storage.radiance_huiwang) player.storage.radiance_huiwang = {};
                            if (!player.storage.radiance_huiwang.used) player.storage.radiance_huiwang.used = 0;
                            player.storage.radiance_huiwang.used++;
                            'step 1'
                            player.draw();
                            'step 2'
                            if (trigger.target != player) {
                                player.chooseCard(true, 'he', '交给' + get.translation(trigger.target) + '一张牌').set('ai', function(card) {
                                    var player = _status.event.player;
                                    var trigger = _status.event.getTrigger();
                                    if (get.attitude(player, trigger.target) <= 0) return 10 - get.value(card) - get.value(card, target);
                                    if (get.tag(trigger.card, 'respondSha') && card.name == 'sha') return 10 - get.value(card);
                                    else if (get.tag(trigger.card, 'respondShan') && card.name == 'shan') return 10 - get.value(card);
                                    else if (get.type2(trigger.card) == 'trick' && card.name == 'wuxie') return 8 - get.value(card);
                                    else if (get.tag(trigger.card, 'damage') && target.hp <= 2 && card.name == 'jiu') return 6 - get.value(card);
                                    return 4.5 - get.value(card);
                                });
                            } else {
                                event.finish();
                            };
                            'step 3'
                            if (result.bool) {
                                trigger.target.gain(result.cards, player, 'giveAuto');
                            };
                            game.delay();
                        },
                        global: ['radiance_huiwang_record', 'radiance_huiwang_clear'],
                        subSkill: {
                            record: {
                                trigger: {
                                    target: 'useCardToTargeted'
                                },
                                forced: true,
                                sub: true,
                                silent: true,
                                popup: false,
                                charlotte: true,
                                firstDo: true,
                                priority: 80,
                                filter: function(event, player) {
                                    return event.player != event.target && event.card && (get.tag(event.card, 'damage') || get.tag(event.card, 'loseCard'));
                                },
                                content: function() {
                                    'step 0'
                                    if (!player.storage.radiance_huiwang) player.storage.radiance_huiwang = {};
                                    if (!player.storage.radiance_huiwang.count) player.storage.radiance_huiwang.count = 0;
                                    player.storage.radiance_huiwang.count++;
                                    trigger.radiance_huiwang = true;
                                },
                            },
                            clear: {
                                trigger: {
                                    global: 'phaseAfter'
                                },
                                forced: true,
                                silent: true,
                                sub: true,
                                charlotte: true,
                                content: function() {
                                    player.storage.radiance_huiwang = {
                                        count: 0,
                                        used: 0,
                                        source: [],
                                    };
                                },
                            },
                        },
                    },



                    // hheaven
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
                                    if (get.tag(card, 'respondShan') && target.getEquip('bagua') && !target.hasSkillTag('unequip2') &&
                                        !player.hasSkillTag('unequip') && !player.hasSkillTag('ignoreSkill') &&
                                        !player.hasSkillTag('directHit_ai')) return [-1, 0.5];
                                },
                            },
                        },
                    },
                    "radiance_xianyue": {
                        trigger: {
                            player: 'phaseUseBegin',
                        },
                        check: function(event, player) {
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
                            return player.countCards('hes', {
                                color: 'black'
                            }) > 0;
                        },
                        content: function() {
                            'step 0'
                            var str = get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' + get.translation(trigger.player.judging[0]) + '，' + get.prompt('radiance_yunming');
                            player.chooseCard(str, 'hes', function(card) {
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
                                    if (get.sgn(get.attitude(player, targets[i])) > get.sgn(get.attitude(player, targets[targets.length - i - 1]))) return 0;
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
                            var str1 = "对" + get.translation(event.current) + "造成一点伤害";
                            var str2 = event.cardsx.length > 0 ? "获得" + get.translation(event.cardsx) : "没有可以获得的牌";
                            player.chooseControl("伤害", "拿牌", "cancel2").set('ai', function(event, player) {
                                var val = 0.001;
                                for (var i = 0; i < event.cardsx.length; i++) {
                                    val += player.getUseValue(event.cardsx[i]);
                                };
                                var effect = get.damageEffect(event.current, player, player);
                                if (val > Math.max(effect, 0)) return 1;
                                if (effect > 0) return 0
                                return 2;
                            }).set('choiceList', [
                                str1,
                                str2,
                            ]);
                            'step 6'
                            if (result.index == 0) {
                                event.current.damage(1, player, 'nocard');
                            } else if (result.index == 1 && event.cardsx.length > 0) {
                                player.gain(event.cardsx, 'gain2', 'log');
                            }
                        },
                        ai: {
                            order: 13,
                            result: {
                                player: function(player) {
                                    var next = player.next;
                                    var next2 = next.next;
                                    if (next2 == player) return 1;
                                    var bool = true;
                                    if (get.attitude(player, next) > 0) {
                                        if (next.countCards('h') <= 1) bool = false;
                                        if (get.attitude(player, next2) > 0) bool = false;
                                    };
                                    if (bool) return 1;
                                    var previous = player.previous;
                                    var previous2 = previous.previous;
                                    bool = true;
                                    if (get.attitude(player, previous) > 0) {
                                        if (previous.countCards('h') <= 1) bool = false;
                                        if (get.attitude(player, previous) > 0) bool = false;
                                    };
                                    if (bool) return 1;
                                    return -1;
                                },
                            },
                        },
                    },
                    "radiance_qiongguang": {
                        init: function(player) {
                            if (!player.storage.radiance_qiongguang) player.storage.radiance_qiongguang = [];
                        },
                        mark: true,
                        marktext: '穹',
                        intro: {
                            mark: function(dialog, storage, player, skill) {
                                if (player.hasSkill('radiance_qiongguang_used')) return "“穹光”本阶段不可以再发动";
                                if (player.storage.radiance_qiongguang && player.storage.radiance_qiongguang.length > 0) {
                                    dialog.addAuto(player.storage.radiance_qiongguang);
                                }
                                return "“穹光”可以发动";
                            },
                        },
                        enable: 'phaseUse',
                        filter: function(event, player) {
                            return player.countCards('h') > 0 && !player.hasSkill('radiance_qiongguang_used');
                        },
                        filterCard: true,
                        position: 'h',
                        selectCard: [1, 1],
                        check: function(card) {
                            var player = _status.event.player;
                            var num = get.number(card, player);
                            if (player.storage.radiance_qiongguang.length < 1 && lib.watersky.func.isPrime(num)) return 8.1 - get.value(card);
                            return 5.1 - get.value(card);
                        },
                        content: function() {
                            'step 0'
                            var num = get.number(cards[0]);
                            if (!lib.watersky.func.isPrime(num)) player.addTempSkill('radiance_qiongguang_used', 'phaseUseEnd');

                            event.cards = get.cards(2);
                            game.cardsGotoOrdering(event.cards);
                            player.showCards(event.cards);
                            if (lib.watersky.func.findGCD(get.number(event.cards[0]), get.number(event.cards[1])) != 1) {
                                event.goto(6);
                            }
                            'step 1'
                            player.chooseTarget(1, '穹光：对一名角色造成一点伤害', lib.filter.notMe, true).set('ai', function(target) {
                                var player = _status.event.player;
                                if (get.attitude(player, target) > 1 && !target.hasSkillTag('nodamage')) return -1;
                                var base = player.storage.radiance_qiongguang.contains(target) ? 3 : 0;
                                return base + get.damageEffect(target, player, player);
                            });
                            'step 2'
                            event.target = result.targets[0];
                            game.log(player, "选择了", event.target, "作为", 'radiance_qiongguang', "的目标");
                            player.line(event.target, 'red');
                            event.target.damage(1, 'nocard');
                            'step 3'
                            var next = player.chooseToMove('穹光：分配亮出的牌', true);
                            next.set('list', [
                                ['亮出的牌', cards],
                                ['你获得的牌', []],
                                [(event.target.isIn() ? get.translation(event.target) + '获得的牌' : "不获得的牌"), []],
                            ]);
                            next.set('filterOk', function(moved) {
                                return moved[0].length == 0;
                            });
                            next.set('processAI', function(list) {
                                var cards = list[0][1].slice(0);
                                var cards1 = cards.filter(function(card) {
                                    return get.value(card) < 3.5 && !get.tag(card, 'save');
                                });
                                cards = cards.removeArray(cards1);
                                return [
                                    [],
                                    cards,
                                    cards1,
                                ];
                            });
                            'step 4'
                            if (result.moved[1].length > 0) {
                                player.gain(result.moved[1], 'gain2', 'log');
                                if (result.moved[1].length == 2 || player.storage.radiance_qiongguang.contains(player)) {
                                    player.addTempSkill('radiance_qiongguang_used', 'phaseUseEnd');
                                } else {
                                    player.storage.radiance_qiongguang.push(player);
                                };
                            };
                            if (result.moved[2].length > 0 && event.target.isIn()) {
                                event.target.gain(result.moved[2], 'gain2', 'log');
                                if (result.moved[2].length == 2 || player.storage.radiance_qiongguang.contains(event.target)) {
                                    player.addTempSkill('radiance_qiongguang_used', 'phaseUseEnd');
                                } else {
                                    player.storage.radiance_qiongguang.push(event.target);
                                };
                            };
                            'step 5'
                            game.delay();
                            event.finish();
                            'step 6'
                            player.chooseTarget(1, '令一名角色获得' + get.translation(event.cards), true).set('ai', function(target) {
                                var player = _status.event.player;
                                return (get.attitude(player, target)) / (target.hp * 1.5 + target.countCards('h') + 1);
                            });
                            'step 7'
                            if (result.bool) {
                                game.log(player, "选择了", result.targets[0], "作为", 'radiance_qiongguang', "的目标");
                                result.targets[0].gain(event.cards, 'gain2', 'log');
                                player.addTempSkill('radiance_qiongguang_used', 'phaseUseEnd');
                            };
                        },
                        subSkill: {
                            used: {
                                onremove: function(player, storage) {
                                    player.storage.radiance_qiongguang.length = 0;
                                },
                                charlotte: true,
                                locked: true,
                                ondisable: true,
                            },
                        },
                        ai: {
                            order: 12,
                            threaten: 1.5,
                            expose: 0.1,
                            result: {
                                player: function(player) {
                                    return 10;
                                },
                            },
                        },
                    },
                    "radiance_tianji": {
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
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseBool("天玑：失去一点体力来取消" + get.translation(trigger.card) + "对你的目标？").set('ai', function(event, player) {
                                var trigger = event._trigger;

                                if (trigger.getParent().excluded.contains(player)) return false;
                                if (get.effect(player, trigger.card, trigger.player, player) >= 0) return false;

                                var id = player.playerid;
                                var map = trigger.getParent().customArgs;
                                var need = 1;
                                if (get.tag(card, 'respondSha')) {
                                    if (map[id] && typeof map[id].shaReq == 'number') need = map[id].shaReq;
                                    if (player.countCards('h', {
                                            name: 'sha'
                                        }) < need) {
                                        return true;
                                    };
                                } else if (get.tag(card, 'respondShan')) {
                                    if (map[id] && typeof map[id].shanRequired == 'number') need = map[id].shanRequired;
                                    if (player.countCards('h', {
                                            name: 'shan'
                                        }) < need) {
                                        return true;
                                    };
                                } else if (get.tag(card, 'damage') && get.name(card) != 'huogong') {
                                    return true;
                                } else if (!get.tag(card, 'damage')) {
                                    if (!player.isDamaged()) return true;
                                };
                                return false;
                            });
                            'step 1'
                            if (result.bool) {
                                player.logSkill('radiance_tianji');
                                if (!event.isMine()) game.delayx();
                                trigger.getParent().excluded.add(player);
                                trigger.getParent().targets.remove(player);
                                trigger.getParent().triggeredTargets2.remove(player);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            player.loseHp(1);
                            'step 3'
                            game.delay();
                        },
                        group: 'radiance_tianji_gain',
                        subSkill: {
                            gain: {
                                trigger: {
                                    player: ["loseHpAfter"],
                                },
                                filter: function(event, player) {
                                    return event.num > 0;
                                },
                                direct: true,
                                content: function() {
                                    'step 0'
                                    event.count = trigger.num;
                                    'step 1'
                                    var str = "展示并获得牌堆顶的牌，直至出现";
                                    player.chooseControl(['大于7', '小于7', 'cancel2'], function() {
                                        return [0, 1].randomGet();
                                    }).set('prompt', get.prompt("radiance_tianji")).set('choiceList', [
                                        str + "点数大于7的牌",
                                        str + "点数小于7的牌",
                                    ]);
                                    'step 2'
                                    event.ongoing = true;
                                    event.count--;
                                    if (result.control == '大于7') {
                                        player.logSkill('radiance_tianji');
                                        game.log(get.translation(player), '选择了点数大于7');
                                        player.popup("大于7");
                                        event.type = 1;
                                    } else if (result.control == '小于7') {
                                        player.logSkill('radiance_tianji');
                                        game.log(get.translation(player), '选择了点数小于7');
                                        player.popup("小于7");
                                        event.type = 2;
                                    } else {
                                        event.finish();
                                    };
                                    'step 3'
                                    if (event.ongoing) {
                                        var card = get.cards(0);
                                        player.gain(card, 'gain2', 'log');

                                        if (get.number(card) > 7 && event.type == 1) {
                                            event.ongoing = false;
                                        } else if (get.number(card) < 7 && event.type != 1) {
                                            event.ongoing = false;
                                        };
                                        game.delay(0.7, 0.1);
                                        event.redo();
                                    };
                                    'step 4'
                                    if (event.count > 0) event.goto(1);
                                },
                            },
                        },
                        action_tag: {
                            overall: 5,
                            draw: 1.5,
                            loseHp_defend: 2,
                        },
                    },


                    "radiance_xianyi": {
                        trigger: {
                            player: ['changeHp', 'dyingBegin'],
                        },
                        init: function(player) {
                            if (!Array.isArray(player.storage.radiance_xianyi)) player.storage.radiance_xianyi = [];
                        },
                        filter: function(event, player) {
                            return !player.storage.radiance_xianyi.contains(player.hp);
                        },
                        forced: true,
                        content: function() {
                            'step 0'
                            player.storage.radiance_xianyi.add(player.hp);
                            'step 1'
                            player.draw(2);
                            'step 2'
                            player.recover();
                        },
                        action_tag: {
                            overall: 3,
                            limited: 0.5,
                            recover: 1,
                            draw: 1,
                        },
                    },
                    "radiance_quhai": {
                        enable: 'phaseUse',
                        filter: function(event, player) {
                            if (player.hasSkill('radiance_quhai_used')) return false;
                            return game.countPlayer(function(current) {
                                return current.getEquip(1);
                            }) > 0;
                        },
                        filterTarget: function(card, player, target) {
                            return target.getEquip(1);
                        },
                        content: function() {
                            'step 0'
                            event.num = player.getStat().skill.radiance_quhai;
                            var str = "弃置装备区内的武器牌";
                            if (!event.num) event.num = 0;
                            if (event.num >= 5) event.num = 5;
                            if (event.num > 1) str += "并摸" + get.cnNumber(event.num - 1) + "张牌";
                            str += "，或失去一点体力";
                            if (target == player) {
                                player.discard(player.getEquip(1), player);
                                event._result = {
                                    bool: true,
                                };
                            } else {
                                target.chooseToDiscard('e', {
                                    subtype: 'equip1'
                                }).set('prompt', str).set('ai', function(card) {
                                    return 5 + _status.event.num - get.value(card);
                                }).set('num', num);
                            }
                            'step 1'
                            if (result.bool) {
                                if (event.num) target.draw(event.num - 1);
                            } else {
                                target.loseHp(1);
                                player.addTempSkill('radiance_quhai_used', 'phaseUseEnd');
                            }
                        },
                        subSkill: {
                            used: {
                                charlotte: true,
                            },
                        },
                        ai: {
                            order: 1,
                            result: {
                                target: function(player, target) {
                                    var num = player.getStat().skill.radiance_quhai;
                                    if (!num) num = 0;
                                    if (target.countCards('he', {
                                            subtype: 'equip1'
                                        }) > 1) return num - 1;
                                    return -2 + num;
                                },
                            },
                        },
                    },
                    "radiance_heyu": {
                        init: function(player) {
                            if (!player.storage.radiance_heyu) player.storage.radiance_heyu = [];
                        },
                        intro: {
                            mark: function(dialog, content, player, storage, skill) {
                                dialog.addAuto(player.storage.radiance_heyu || []);
                            },
                            onunmark: function(storage, player) {
                                if (storage && storage.length) {
                                    player.$throw(storage, 1000);
                                    game.cardsDiscard(storage);
                                    game.log(storage, '被置入了弃牌堆');
                                    storage.length = 0;
                                }
                            },
                        },
                        marktext: "鹤",
                        onremove: function(player) {
                            if (player.storage.radiance_heyu.length) {
                                player.$throw(player.storage.radiance_heyu, 1000);
                                game.log(player.storage.radiance_heyu, '被置入了弃牌堆');
                                game.cardsDiscard(player.storage.radiance_heyu);
                                player.storage.radiance_heyu = [];
                                player.unmarkSkill('radiance_heyu');
                            }
                        },
                        trigger: {
                            global: 'useCardToTargeted',
                        },
                        filter: function(event, player) {
                            if (player == event.player) return false;
                            if (player.storage.radiance_heyu.length > 3) return false;
                            if (player.hp < 1) return false;
                            if (event.targets.length > 1) return false;

                            var card = event.card;
                            if (get.name(card) == 'sha' || get.type(card) == 'trick') return true;
                            return false;
                        },
                        logTarget: 'target',
                        prompt2: function(event, player) {
                            return "失去一点体力并无效" + get.translation(event.player) + "使用的【" + get.translation(event.card) + "】";
                        },
                        check: function(event, player) {
                            if (event.getParent().excluded.contains(event.target)) return false;

                            if (get.effect(event.target, event.card, event.player, player) < 0 && event.target.hp <= player.hp) {
                                if (get.tag(event.card, 'respondSha')) {
                                    if (event.target.countCards('h', {
                                            name: 'sha'
                                        }) == 0) {
                                        return true;
                                    }
                                } else if (get.tag(event.card, 'respondShan')) {
                                    if (event.target.countCards('h', {
                                            name: 'shan'
                                        }) == 0) {
                                        return true;
                                    }
                                } else if (get.tag(event.card, 'damage')) {
                                    if (event.target.countCards('h') < 2) return true;
                                } else if (get.tag(event.card, 'recover')) {
                                    return player.hp > 2;
                                }
                            }
                            return false;
                        },
                        locked: false,
                        content: function() {
                            'step 0'
                            trigger.getParent().excluded.add(trigger.target);
                            'step 1'
                            var suits = [];
                            for (var i = 0; i < player.storage.radiance_heyu.length; i++) {
                                suits.add(get.suit(player.storage.radiance_heyu[i]));
                            };
                            event.suits = suits;
                            event.card = get.cards(0);
                            game.cardsGotoOrdering(event.card);
                            event.cards = [];
                            player.showCards(event.card, "“鹤羽”展示的牌");
                            'step 2'
                            if (event.card && event.suits.contains(get.suit(event.card))) {
                                event.cards.push(event.card);
                                event.card = get.cards(0);
                                game.cardsGotoOrdering(event.card);
                                player.showCards(event.card, "“鹤羽”展示的牌");
                                game.delay(0, 0.5);
                                event.redo();
                            };
                            'step 3'
                            if (card) {
                                cards.push(card);
                            };
                            if (cards.length) player.gain(cards, 'gain2', 'log');
                            'step 4'
                            var str = "将一张";
                            if (event.suits.length > 0) {
                                str += "花色不为" + get.translation(event.suits) + "的";
                            }
                            str += "手牌置于武将牌上";
                            player.chooseCard(1, 'h', str, true, function(card) {
                                var player = _status.event.player;
                                for (var i = 0; i < player.storage.radiance_heyu.length; i++) {
                                    if (get.suit(player.storage.radiance_heyu[i]) == get.suit(card)) return false;
                                };
                                return true;
                            }).set('ai', function(card) {
                                return 10 - get.value(card)
                            });
                            'step 5'
                            if (result.bool && result.cards.length) {
                                player.lose(result.cards, ui.special, 'toStorage');
                                player.storage.radiance_heyu = player.storage.radiance_heyu.concat(result.cards);
                                player.syncStorage('radiance_heyu');
                                player.markSkill('radiance_heyu');
                                game.log(player, '将', result.cards, '置于武将牌上');
                            }
                            'step 6'
                            if (cards.length != 2) player.loseHp();
                            'step 7'
                            game.updateRoundNumber();
                            game.delay();
                        },
                        ai: {
                            threaten: 1.2,
                        },
                    },
                    "radiance_xianci": {
                        enable: 'chooseToUse',
                        filter: function(event, player) {
                            if (!Array.isArray(player.storage.radiance_heyu)) return false;
                            if (event.filterCard({
                                    name: 'tao',
                                }, player, event)) {

                                var color = {
                                    'red': 0,
                                    'black': 0,
                                };
                                for (var i = 0; i < player.storage.radiance_heyu.length; i++) {
                                    if (typeof color[get.color(player.storage.radiance_heyu[i])] == 'number') {
                                        if (color[get.color(player.storage.radiance_heyu[i])] > 0) {
                                            return true;
                                        } else {
                                            color[get.color(player.storage.radiance_heyu[i])] += 1;
                                        }
                                    }
                                }
                            }
                            return false;
                        },
                        chooseButton: {
                            dialog: function(event, player) {
                                return ui.create.dialog('鹤羽', player.storage.radiance_heyu, 'hidden');
                            },
                            select: 2,
                            filter: function(button, player) {
                                if (ui.selected.buttons.length > 0) {
                                    return get.color(ui.selected.buttons[0].link) == get.color(button.link);
                                }
                                return true;
                            },
                            check: function(button) {
                                var player = _status.event.player;
                                if (player.countCards('hs', 'tao') > 0) return 0;

                                var evt = _status.event.getParent('chooseToUse', true);
                                if (evt && evt.type == 'dying') {
                                    if (evt.dying != player && get.effect(evt.dying, {
                                            name: 'tao'
                                        }, player, player) <= 0) return 0;
                                    return 2;
                                };
                                if (player.storage.radiance_heyu.length == 4) return 1;
                                return 0;
                            },
                            backup: function(links, player) {
                                return {
                                    filterCard: function() {
                                        return false
                                    },
                                    selectCard: -1,
                                    viewAs: {
                                        name: 'tao',
                                        cards: links
                                    },
                                    cards: links,
                                    onuse: function(result, player) {
                                        result.cards = lib.skill[result.skill].cards;
                                        player.storage.radiance_heyu.removeArray(result.cards);
                                        player.syncStorage('radiance_heyu');
                                        if (!player.storage.radiance_heyu.length) {
                                            player.unmarkSkill('radiance_heyu');
                                        } else {
                                            player.markSkill('radiance_heyu');
                                        }
                                        player.logSkill('radiance_heyu', result.targets);
                                    }
                                }
                            },
                            prompt: function(links, player) {
                                return '请选择【桃】的目标';
                            },
                        },
                        mod: {
                            globalTo: function(from, to, distance) {
                                if (to.storage.radiance_heyu) return distance + to.storage.radiance_heyu.length;
                            },
                            maxHandcard: function(player, num) {
                                if (player.storage.radiance_heyu) return num + player.storage.radiance_heyu.length;
                            },
                        },
                        locked: true,
                        ai: {
                            order: 10,
                            save: true,
                            combo: 'radiance_heyu',
                            result: {
                                player: function(player) {
                                    return 1;
                                },
                            },
                        },
                    },


                    // underworld
                    "radiance_siqi": {
                        trigger: {
                            global: ['dyingAfter']
                        },
                        frequent: true,
                        filter: function(event, player) {
                            return event.player.isIn();
                        },
                        content: function() {
                            player.draw();
                        },
                    },
                    "radiance_hunduan": {
                        trigger: {
                            player: "phaseUseBegin",
                        },
                        locked: true,
                        direct: true,
                        filter: function(event, player) {
                            return player.countCards('he', function(card) {
                                return get.color(card) == 'black';
                            }) > 0;
                        },
                        content: function() {
                            'step 0'
                            player.chooseToDiscard('he', get.prompt2("radiance_hunduan"), 1, function(card) {
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
                                player.logSkill('radiance_hunduan');
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
                                event.targets[num].addTempSkill('radiance_hunduan_db');
                                event.num++;
                                event.redo();
                            }
                        },
                    },
                    "radiance_hunduan_db": {
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
                        marktext: "断",
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
                                    return lib.skill.radiance_hunduan_db.skillBlocker(i, player);
                                });
                                if (list.length) str += "，以下技能失效：" + get.translation(list);
                                return str;
                            }
                        },
                        ai: {
                            neg: true,
                        },
                    },
                    "radiance_yindun": {
                        mod: {
                            targetEnabled: function(card, player, target) {
                                if (['shandian', 'nanman', 'wanjian'].contains(get.name(card))) return false;
                            },
                        },
                        trigger: {
                            global: ['useCardAfter'],
                        },
                        filter: function(event, player) {
                            if (!player.isDamaged()) return false;
                            return ['nanman', 'wanjian'].contains(get.name(event.card));
                        },
                        forced: true,
                        content: function() {
                            player.recover();
                        },
                        action_tag: {
                            overall: 2,
                            direct_defend: 1,
                            recover: 0.5,
                        }
                    },
                    "radiance_huoshi": {
                        enable: "phaseUse",
                        usable: 1,
                        chooseButton: {
                            dialog: function(event, player) {
                                var list = [
                                    '体力值小于等于你的角色',
                                    '体力值大于等于你的角色',
                                ];
                                var choiceList = ui.create.dialog('祸世：请选择一项', 'forcebutton', 'hidden');
                                for (var i = 0; i < list.length; i++) {
                                    var str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                                    var bool = lib.skill.radiance_huoshi.chooseButton.filter({
                                        link: i
                                    }, player);
                                    if (!bool) str += '<div style="opacity:0.5">';
                                    str += list[i];
                                    if (!bool) str += '</div>';
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
                            },
                            filter: function(button, player) {
                                var choices = [
                                    function(card, player, target) {
                                        return target.hp <= player.hp;
                                    },
                                    function(card, player, target) {
                                        return target.hp >= player.hp;
                                    },
                                ];
                                return game.hasPlayer(function(current) {
                                    return choices[button.link](null, player, current)
                                });
                            },
                            check: function(button) {
                                var player = _status.currentPhase;
                                var choices = [
                                    function(card, player, target) {
                                        return target.hp <= player.hp;
                                    },
                                    function(card, player, target) {
                                        return target.hp >= player.hp;
                                    },
                                ];
                                var eff = 0;
                                game.countPlayer(function(current) {
                                    if (choices[button.link](null, player, current)) {
                                        eff += get.damageEffect(current, player, player);
                                        return true;
                                    }
                                    return false;
                                });
                                return eff;
                            },
                            backup: function(links) {
                                var toreturn = {
                                    filterTarget: function(card, player, target) {
                                        return target.hp >= player.hp;
                                    },
                                    selectTarget: -1,
                                    multitarget: true,
                                    direct: true,
                                    content: function() {
                                        'step 0'
                                        event.targets = get.sort(targets, 'seat', player);
                                        player.logSkill('radiance_huoshi', event.targets);
                                        'step 1'
                                        if (event.targets.length > 0) {
                                            var target = event.targets.shift();
                                            target.loseHp();
                                            event.redo();
                                        };
                                    },
                                    ai: {
                                        order: 7,
                                        result: {
                                            target: -2,
                                        },
                                    },
                                };
                                if (links[0] == 0) {
                                    toreturn.filterTarget = function(card, player, target) {
                                        return target.hp <= player.hp;
                                    };
                                };
                                return toreturn;
                            },
                        },
                        ai: {
                            order: 7,
                            result: {
                                player: function(player) {
                                    var choices = [
                                        function(card, player, target) {
                                            return target.hp <= player.hp;
                                        },
                                        function(card, player, target) {
                                            return target.hp >= player.hp;
                                        },
                                    ];
                                    var eff1 = 0;
                                    var eff2 = 0;
                                    game.countPlayer(function(current) {
                                        if (choices[0](null, player, current)) {
                                            eff1 += get.damageEffect(current, player, player);
                                            return true;
                                        }
                                        if (choices[1](null, player, current)) {
                                            eff2 += get.damageEffect(current, player, player);
                                            return true;
                                        }
                                        return false;
                                    });
                                    if (player.hp > 3 || player.countCards('h', 'tao')) return Math.max(eff1, eff2);
                                    if (player.hp < 2 && player.countCards('h', 'jiu')) return Math.max(eff1, eff2) - 2;
                                    return 0;
                                },
                            },
                        },
                        action_tag: {
                            overall: 5,
                            loseHp: 7,
                            negative: 1,
                        }
                    },
                    "radiance_jiguang": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        usable: 1,
                        init: function(player) {
                            if (Array.isArray(player.storage.radiance_jiguang)) return;
                            player.storage.radiance_jiguang = [];
                        },
                        chooseButton: {
                            dialog: function(event, player) {
                                var list = [];
                                for (var i = 0; i < lib.inpile.length; i++) {
                                    var name = lib.inpile[i];
                                    if (player.storage.radiance_jiguang.contains(name)) continue;
                                    if (name == 'du') continue;
                                    if (name == 'sha') {
                                        list.push(['基本', '', 'sha']);
                                        list.push(['基本', '', 'sha', 'fire']);
                                        list.push(['基本', '', 'sha', 'thunder']);
                                        list.push(['基本', '', 'sha', 'ice']);
                                    } else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                                    else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                                };
                                if (list.length == 0) {
                                    return ui.create.dialog('极光已无可用牌');
                                };
                                return ui.create.dialog('极光', [list, 'vcard']);
                            },
                            filter: function(button, player) {
                                return _status.event.getParent().filterCard({
                                    name: button.link[2],
                                    nature: button.link[3],
                                    radiance_jiguang: true,
                                }, player, _status.event.getParent());
                            },
                            check: function(button) {
                                var player = _status.event.player;
                                var name = button.link[2];
                                if (player.countCards('hs', name) > 0) return 0;
                                if (name == 'shan') return 1;
                                if (name == 'wuxie') return 1;
                                if (name == 'huogong') return 1;
                                var evt = _status.event.getParent('chooseToUse', true);
                                if (evt && evt.type == 'dying') {
                                    if (evt.dying != player && get.effect(evt.dying, {
                                            name: name
                                        }, player, player) <= 0) return 0;
                                    if (evt.dying == player && name == 'jiu') return 2.1;
                                    return 2;
                                };
                                var effect = player.getUseValue(button.link[2], false);
                                if (effect > 0) return effect;
                                return 0;
                            },
                            backup: function(links, player) {
                                return {
                                    filterCard: function(card) {
                                        return false;
                                    },
                                    selectCard: -1,
                                    popname: true,
                                    viewAs: {
                                        name: links[0][2],
                                        nature: links[0][3],
                                        radiance_jiguang: true,
                                    },
                                    onuse: function(result, player) {
                                        player.logSkill('radiance_jiguang');
                                        player.storage.radiance_jiguang.add(result.card.name);
                                        player.storage.radiance_jiguang_used = result.card.name;
                                        var next = game.createEvent('radiance_jiguang_clear');
                                        next.player = player;
                                        _status.event.next.remove(next);
                                        var phase = _status.event.getParent('phase', true);
                                        if (phase) phase.after.push(next);
                                        next.setContent(function() {
                                            delete player.storage.radiance_jiguang_used;
                                        });
                                    },
                                    onrespond: function(result, player) {
                                        player.logSkill('radiance_jiguang');
                                        player.storage.radiance_jiguang.add(result.card.name);
                                        player.storage.radiance_jiguang_used = result.card.name;
                                        var next = game.createEvent('radiance_jiguang_clear');
                                        next.player = player;
                                        _status.event.next.remove(next);
                                        var phase = _status.event.getParent('phase', true);
                                        if (phase) phase.after.push(next);
                                        next.setContent(function() {
                                            delete player.storage.radiance_jiguang_used;
                                        });
                                    },
                                };
                            },
                            prompt: function(links, player) {
                                return '视为使用或打出' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '';
                            },
                        },
                        hiddenCard: function(player, name) {
                            if (player.storage.radiance_jiguang.contains(name)) return false;
                            var num = player.getStat().skill.radiance_jiguang;
                            if (!num) return name == 'wuxie';
                        },
                        mod: {
                            targetInRange: function(card, player, target) {
                                if (card.radiance_jiguang) return true;
                            },
                        },
                        ai: {
                            order: 7,
                            result: {
                                player: function(player) {
                                    var players = game.filterPlayer();
                                    return 1;
                                },
                            },
                            threaten: 1.9,
                            save: true,
                            respondTao: true,
                            respondShan: true,
                            respondSha: true,
                            skillTagFilter: function(player, tag) {
                                if (tag == 'respondSha') {
                                    if (player.storage.radiance_jiguang.contains('sha')) return false;
                                }
                                if (tag == 'respondShan') {
                                    if (player.storage.radiance_jiguang.contains('shan')) return false;
                                }
                                if (tag == 'respondTao') {
                                    if (player.storage.radiance_jiguang.contains('tao')) return false;
                                }
                                if (tag == 'save') {
                                    if (player.storage.radiance_jiguang.contains('tao') && player.storage.radiance_jiguang.contains('jiu')) return false;
                                }
                            },
                        },
                        action_tag: {
                            overall: 5,
                            sha_viewAs: 1,
                            trick_viewAs: 2,
                        },
                    },
                    "radiance_tianquan": {
                        trigger: {
                            player: ['phaseEnd'],
                        },
                        frequent: true,
                        content: function() {
                            'step 0'
                            if (player.isMinHp()) {
                                player.chooseDrawRecover(2, 1, true);
                            } else {
                                player.draw();
                            };
                            if (!Array.isArray(player.storage.radiance_jiguang)) event.finish();
                            'step 1'
                            var list = [];
                            for (var i = 0; i < player.storage.radiance_jiguang.length; i++) {
                                var name = player.storage.radiance_jiguang[i];
                                if (name == player.storage.radiance_jiguang_used) continue;
                                if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                                else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                            };
                            if (list.length == 0) {
                                event.finish();
                                return;
                            } else {
                                var dialog = ui.create.dialog('是否恢复“极光”的一个已用牌名？', [list, 'vcard']);
                                player.chooseButton(dialog, 1).set('ai', function(button) {
                                    var player = _status.event.player;
                                    var name = button.link[2];
                                    if (name == 'tao') {
                                        var friends = player.getFriends(true);
                                        for (var i = 0; i < friends.length; i++) {
                                            if (friends[i].hp == 1 || (friends[i].countCards('h') <= 2 && friends[i].hp == 2)) return 10;
                                        };
                                        return 6;
                                    } else if (name == 'shan') {
                                        if (!player.hasShan()) return 8;
                                        return 4;
                                    } else if (name == 'wuxie') {
                                        var friends = player.getFriends(true);
                                        for (var i = 0; i < friends.length; i++) {
                                            if (friends[i].countCards('j').length > 0) return 7;
                                        };
                                        return 5;
                                    };
                                    return player.getUseValue(name, false);
                                });
                            };
                            'step 2'
                            if (result.bool) {
                                player.storage.radiance_jiguang.remove(result.links[0][2]);
                            };
                        },
                    },
                    "radiance_jimie": {
                        trigger: {
                            player: "phaseBefore",
                        },
                        forced: true,
                        locked: true,
                        juexingji: true,
                        fixed: true,
                        superCharlotte: true,
                        charlotte: true,
                        zero: true,
                        skillAnimation: "legend",
                        animationColor: "key",
                        priority: 100000,
                        filter: function(event, player) {
                            if (!Array.isArray(player.storage.radiance_jiguang)) return false;
                            for (var i = 0; i < lib.inpile.length; i++) {
                                var name = lib.inpile[i];
                                if (name == 'du') continue;
                                if (get.type(name) != 'trick' && get.type(name) != 'basic') continue;
                                if (!player.storage.radiance_jiguang.contains(name)) return false;
                            };
                            return true;
                        },
                        content: function() {
                            if (game.showIdentity) {
                                game.showIdentity();
                            };
                            var bool = false;
                            if (player == game.me) {
                                bool = true;
                            } else {
                                var friends = player.getFriends(true);
                                if (friends.contains(game.me)) bool = true;
                            };
                            game.over(bool);
                        },
                    },
                    "radiance_cancun": {
                        enable: "phaseUse",
                        usable: 1,
                        filterCard: true,
                        selectCard: 1,
                        position: "h",
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        check: function(card) {
                            var number = get.number(card);
                            return (Math.abs(number - 7) + 1 / Math.max(get.value(card), 0.5));
                        },
                        content: function() {
                            'step 0'
                            event.number = get.number(cards[0]);
                            event.cards = get.cards(3 + 2 * player.getDamagedHp());
                            game.cardsGotoOrdering(event.cards);
                            player.showCards(event.cards);

                            event.less = 0;
                            for (var i = 0; i < event.cards.length; i++) {
                                if (get.number(event.cards[i]) < event.number) {
                                    event.less++;
                                } else if (get.number(event.cards[i]) > event.number) {
                                    event.less--;
                                }
                            }
                            'step 1'
                            var chooseButton = player.chooseButton([1, 3], ["残存", event.cards]);
                            chooseButton.set('ai', function(button) {
                                if (event.less > 0 && get.number(button.link) > event.number) return 0;
                                if (event.less < 0 && get.number(button.link) < event.number) return 0;
                                return get.value(button.link);
                            });
                            chooseButton.set('filterButton', function(button) {
                                if (ui.selected.buttons.length < 1) return true;
                                for (var i = 0; i < ui.selected.buttons.length; i++) {
                                    if (get.number(ui.selected.buttons[i].link) < event.number) {
                                        return get.number(button.link) <= event.number;
                                    } else if (get.number(ui.selected.buttons[i].link) > event.number) {
                                        return get.number(button.link) >= event.number;
                                    }
                                }
                                return true;
                            });
                            'step 2'
                            if (result.bool && result.links.length > 0) {
                                result.links.sort();
                                player.showCards(result.links);
                                player.gain(result.links, 'gain2', 'log');
                            }
                        },
                        ai: {
                            order: 15,
                            result: {
                                player: function(player) {
                                    return (3 + 2 * player.getDamagedHp()) / 2;
                                },
                            },
                            effect: {
                                target: function(card, player, target, current) {
                                    if (get.tag(card, 'recover')) {
                                        if (player.getDamagedHp() == 1 && player.needsToDiscard() < 2) return 0;
                                    };
                                },
                            },
                        },
                    },
                    "radiance_shangyu": {
                        trigger: {
                            global: ["gameDrawAfter", "phaseBefore"],
                            player: ["dyingAfter"],
                        },
                        firstDo: true,
                        forced: true,
                        marktext: "羽",
                        intro: {
                            name: '殇羽',
                            content: 'mark'
                        },
                        init: function(player) {
                            if (!player.storage.radiance_shangyu_used) player.storage.radiance_shangyu_used = false;
                        },
                        filter: function(event, player) {
                            return !player.storage.radiance_shangyu_used || event.name == 'dying';
                        },
                        content: function() {
                            player.addMark('radiance_shangyu', trigger.name == 'dying' ? 1 : 2);
                            player.storage.radiance_shangyu_used = true;
                        },
                        group: "radiance_shangyu_damage",
                        subSkill: {
                            damage: {
                                trigger: {
                                    player: ['damageBegin4'],
                                },
                                forced: true,
                                filter: function(event, player) {
                                    return event.player.hasMark('radiance_shangyu') && event.num > 0;
                                },
                                content: function() {
                                    'step 0'
                                    trigger.cancel();
                                    trigger.player.removeMark('radiance_shangyu', 1);
                                    'step 1'
                                    if (trigger.source && trigger.source.countCards('he')) trigger.source.randomDiscard(1, true, 'he');
                                },
                            },
                        },
                        mod: {
                            maxHandcardBase: function(player, num) {
                                return (num + player.countMark('radiance_shangyu'));
                            },
                        },
                    },
                    "radiance_yujia": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        derivation: ['radiance_qinshi'],
                        filter: function(event, player) {
                            if (player.countCards('hs') > 0) return true;
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
                                    position: 'hs',
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
                        locked: false,
                        check: function(event, player) {
                            return get.attitude(player, event.source) < player.countMark('radiance_yujia');
                        },
                        content: function() {
                            'step 0'
                            event.num = Math.min(player.countMark('radiance_yujia'), trigger.num);
                            trigger.source.addAdditionalSkill("radiance_qinshi", "radiance_qinshi");
                            'step 1'
                            event.num--;
                            player.removeMark('radiance_yujia', 1);
                            trigger.source.addMark('radiance_yujia', 1, true);
                            player.draw();
                            'step 2'
                            if (event.num > 0) {
                                player.chooseBool(get.prompt2('radiance_jiayi')).set('choice', (get.realAttitude || get.attitude)(player, trigger.source) <= 0);
                            } else {
                                if (player.countMark('radiance_yujia') < 1) player.removeAdditionalSkill('radiance_qinshi');
                                event.finish();
                            }
                            'step 3'
                            if (result.bool) {
                                event.goto(1);
                            }
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
                        mod: {
                            maxHandcard: function(player, num) {
                                return num + game.filterPlayer(function(target) {
                                    return target != player && target.hasMark('radiance_yujia');
                                }).length;
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
                    "radiance_moxiang": {
                        enable: 'phaseUse',
                        usable: 1,
                        filterTarget: function(card, player, target) {
                            return target != player;
                        },
                        intro: {
                            mark: function(dialog, storage, player, skill) {
                                var str = "在下一个结束阶段";
                                if (typeof player.storage.radiance_moxiang_gl == 'object') {
                                    var num1, num2;
                                    if (player.storage.radiance_moxiang_gl.discard > 0) num1 = player.storage.radiance_moxiang_gl.discard * 2;
                                    if (player.storage.radiance_moxiang_gl.lose > 0) num2 = player.storage.radiance_moxiang_gl.lose;
                                    if (num1 && num2) {
                                        return str + "弃置" + get.cnNumber(num1) + "张牌并失去" + num2 + "点体力";
                                    } else if (num1) {
                                        return str + "弃置" + get.cnNumber(num1) + "张牌";
                                    } else if (num2) {
                                        return str + "失去" + num2 + "点体力";
                                    }
                                }
                            },
                        },
                        content: function() {
                            'step 0'
                            if (typeof target.storage.radiance_moxiang_gl !== 'object') {
                                target.storage.radiance_moxiang_gl = {
                                    'lose': 0,
                                    'discard': 0,
                                };
                            };
                            event.discard = false;
                            target.chooseToDiscard(2, 'h').set('ai', function(card) {
                                var player = _status.event.player;
                                if (player.getDamagedHp() <= 1) return 0;
                                if (player.hp <= 1 && !player.hasFriend()) return 0;
                                return 5 + 1.5 * (3 - player.hp) - get.value(card);
                            }).set('prompt', "弃置两张牌并回复一点体力，下一个结束阶段失去一点体力；否则失去一点体力并摸两张牌，下一个结束阶段随机弃置两张牌");
                            'step 1'
                            if (result.bool) {
                                target.recover();
                                event.discard = true;
                                event.goto(3);
                            } else {
                                target.loseHp();
                            }
                            'step 2'
                            if (!target.isIn()) {
                                event.finish();
                            } else {
                                target.draw(2);
                            }
                            'step 3'
                            // if (!target.hasSkill('radiance_moxiang_gl')) target.addSkill('radiance_moxiang_gl');
                            if (event.discard) {
                                target.storage.radiance_moxiang_gl.lose++;
                            } else {
                                target.storage.radiance_moxiang_gl.discard++;
                            }
                            target.markSkill('radiance_moxiang');
                        },
                        global: 'radiance_moxiang_gl',
                        action_tag: {
                            overall: 3,
                            in: 1,
                            loseHp: 1,
                            recover: 0.5,
                        },
                        ai: {
                            order: 10,
                            result: {
                                target: -1,
                            },
                        },
                    },
                    "radiance_moxiang_gl": {
                        trigger: {
                            player: 'phaseEnd',
                        },
                        filter: function(event, player) {
                            return typeof player.storage.radiance_moxiang_gl == 'object' && player.storage.radiance_moxiang_gl.lose + player.storage.radiance_moxiang_gl.discard > 0;
                        },
                        forced: true,
                        charlotte: true,
                        priority: -30,
                        content: function() {
                            'step 0'
                            if (player.storage.radiance_moxiang_gl.discard > 0 && player.countCards('he') > 0) {
                                player.randomDiscard('he', 2);
                                player.storage.radiance_moxiang_gl.discard--;
                                event.redo();
                            };
                            'step 1'
                            if (player.storage.radiance_moxiang_gl.lose > 0 && player.isIn()) {
                                player.loseHp(1);
                                player.storage.radiance_moxiang_gl.lose--;
                                event.redo();
                            };
                            'step 2'
                            if (player.storage.radiance_moxiang_gl.discard < 1) player.unmarkSkill('radiance_moxiang');
                        },
                    },
                    "radiance_zaichun": {
                        trigger: {
                            target: 'useCardToTargeted',
                        },
                        filter: function(event, player) {
                            if (!event.player || !event.player.isIn()) return false;
                            if (player == event.player) return false;
                            if (player.countCards('h') < 1) return false;

                            var card = event.card;
                            if (get.type2(card) == 'trick' || get.name(card) == 'sha') return true;
                            return false;
                        },
                        check: function(event, player) {
                            var card1 = event.card;
                            var hs = player.countCards('h');
                            if (card1.name == 'wugu') return hs < 3;
                            if (get.effect(player, card1, event.player, player) >= 0) return hs < 4;

                            if (get.name(event.card) == 'huogong') return hs < 4;
                            if (get.tag(event.card, 'damage')) {
                                if (player.hp == 1 && player.countCards('h', function(card) {
                                        return get.tag(card, 'save');
                                    }) > 0) {
                                    return false;
                                }
                            }
                            if (get.tag(event.card, 'respondSha')) {
                                if (player.countCards('h', {
                                        name: 'sha'
                                    }) == 1) {
                                    return false;
                                }
                            } else if (get.tag(event.card, 'respondShan')) {
                                if (player.countCards('h', {
                                        name: 'shan'
                                    }) == 1) {
                                    return false;
                                }
                            }
                            return player.countCards('h') < 4;
                        },
                        content: function() {
                            'step 0'
                            event.source = trigger.player;
                            event.source.discardPlayerCard(player, 'h', true);
                            'step 1'
                            var evt = trigger.getParent('useCard');
                            var next = game.createEvent('radiance_zaichun_draw');
                            next.player = player;
                            next.setContent(function() {
                                player.drawTo(4);
                            });
                            event.next.remove(next);
                            evt.after.push(next);
                        },
                    },
                    "radiance_zhuisi": {
                        shaRelated: true,
                        trigger: {
                            global: 'shaMiss'
                        },
                        filter: function(event, player) {
                            return player.canCompare(event.target);
                        },
                        check: function(event, player) {
                            if (!player.hasCard(function(card) {
                                    return get.value(card) < 6.1;
                                })) return false;
                            return get.attitude(player, event.target) < 0;
                        },
                        logTarget: 'target',
                        content: function() {
                            'step 0'
                            player.chooseToCompare(trigger.target);
                            'step 1'
                            if (result.bool) {
                                trigger.untrigger();
                                trigger.trigger('shaHit');
                                trigger._result.bool = false;
                                trigger._result.result = null;
                            }
                        },
                        ai: {
                            expose: 0.3,
                        },
                    },
                    "radiance_nanming": {
                        trigger: {
                            player: 'compare',
                            target: 'compare'
                        },
                        forced: true,
                        locked: false,
                        filter: function(event, player) {
                            var num2 = 0;
                            if (player == event.player) {
                                num2 = event.target.getAttackRange();
                            } else {
                                num2 = event.player.getAttackRange();
                            }
                            return player.getAttackRange() > num2;
                        },
                        content: function() {
                            'step 0'
                            game.log(player, '拼点视为赢');
                            if (player == trigger.player) {
                                trigger.num1 = 14;
                            } else {
                                trigger.num2 = 14;
                            }
                        },
                        group: 'radiance_nanming_draw',
                        subfrequent: ['draw'],
                        subSkill: {
                            draw: {
                                trigger: {
                                    global: 'chooseToCompareBegin',
                                },
                                filter: function(event, player) {
                                    if (player == event.player) return true;
                                    if (event.targets) return event.targets.contains(player);
                                    return player == event.target;
                                },
                                frequent: true,
                                content: function() {
                                    player.draw();
                                },
                                sub: true,
                            },
                        },
                    },
                    "radiance_huisheng": {
                        marktext: '生',
                        trigger: {
                            player: ['damageBegin4', 'phaseJieshuBegin'],
                            global: 'gameDrawAfter',
                        },
                        forced: true,
                        filter: function(event, player) {
                            if (event.name == 'phaseJieshu') return player.countMark("radiance_huisheng") > 1;
                            return event.name != 'damage' || event.num > 0;
                        },
                        content: function() {
                            'step 0'
                            if (trigger.name == 'damage') {
                                player.addMark('radiance_huisheng', trigger.num);
                                trigger.cancel();
                                event.finish();
                            } else if (trigger.name == 'phaseJieshu') {
                                event.num = player.countMark("radiance_huisheng") - 1;
                            } else {
                                player.addMark('radiance_huisheng', 1);
                                event.finish();
                            }
                            'step 1'
                            player.removeMark('radiance_huisheng', event.num);
                            player.loseHp(event.num);
                            'step 2'
                            if (event.num > 0) {
                                player.gain(get.cardPile(function(card) {
                                    return get.name(card) == 'sha';
                                }), 'gain2', 'log');
                                event.num--;
                                event.redo();
                            }
                            'step 3'
                            game.updateRoundNumber();
                        },
                        intro: {
                            name: "生",
                            content: 'mark'
                        },
                        mod: {
                            cardUsable: function(card, player, num) {
                                if (card.name == 'sha') return num + player.countMark("radiance_huisheng");
                            },
                        },
                        action_tag: {
                            combo: 1,
                            damage_prevent: 9,
                            sha_multi: 2,
                            search: 1,
                        },
                    },
                    "radiance_yuanhun": {
                        shaRelated: true,
                        locked: false,
                        group: ["radiance_yuanhun_spade", "radiance_yuanhun_heart", "radiance_yuanhun_club", "radiance_yuanhun_diamond"],
                        subfrequent: ['diamond'],
                        subSkill: {
                            spade: {
                                trigger: {
                                    source: 'damageSource'
                                },
                                filter: function(event, player) {
                                    if (get.name(event.card, player) != 'sha' || get.suit(event.card, player) != 'spade') return false;
                                    return player.hasMark("radiance_huisheng") && event.num > 0 && event.notLink();
                                },
                                prompt2: function(event, player) {
                                    return '移除一个“生”标记';
                                },
                                content: function() {
                                    player.removeMark("radiance_huisheng", 1);
                                },
                            },
                            heart: {
                                trigger: {
                                    source: 'damageBegin1'
                                },
                                filter: function(event, player) {
                                    if (get.name(event.card, player) != 'sha' || get.suit(event.card, player) != 'heart') return false;
                                    return player.hasMark("radiance_huisheng") && event.num > 0 && event.notLink();
                                },
                                prompt2: function(event, player) {;
                                    return '令此伤害+' + player.countMark("radiance_huisheng") + '';
                                },
                                content: function() {
                                    trigger.num += player.countMark("radiance_huisheng");
                                },
                            },
                            club: {
                                trigger: {
                                    player: 'useCardToPlayered'
                                },
                                prompt2: function(event, player) {
                                    return '令' + get.translation(event.target) + "额外使用" + get.cnNumber(player.countMark("radiance_huisheng")) + "张【闪】";
                                },
                                filter: function(event, player) {
                                    if (get.name(event.card, player) != 'sha' || get.suit(event.card, player) != 'club') return false;
                                    return player.hasMark("radiance_huisheng");
                                },
                                content: function() {
                                    var num = player.countMark("radiance_huisheng");
                                    var id = trigger.target.playerid;
                                    var map = trigger.getParent().customArgs;
                                    if (!map[id]) map[id] = {};
                                    if (typeof map[id].shanRequired == 'number') {
                                        map[id].shanRequired += num;
                                    } else {
                                        map[id].shanRequired = num + 1;
                                    };
                                },
                                mod: {
                                    targetInRange: function(card, player, target) {
                                        if (card.name == 'sha' && get.suit(card) == 'club' && player.hasMark("radiance_huisheng")) {
                                            var num = player.getAttackRange(true) + player.countMark("radiance_huisheng");
                                            if (get.distance(player, target) <= num) return true;
                                        }
                                    },
                                },
                            },
                            diamond: {
                                trigger: {
                                    player: 'useCardToPlayered'
                                },
                                frequent: true,
                                prompt2: function(event, player) {
                                    return '摸' + get.cnNumber(player.countMark("radiance_huisheng")) + '张牌';
                                },
                                filter: function(event, player) {
                                    if (get.name(event.card, player) != 'sha' || get.suit(event.card, player) != 'diamond') return false;
                                    return player.hasMark("radiance_huisheng");
                                },
                                content: function() {
                                    var num = player.countMark("radiance_huisheng");
                                    player.draw(num);
                                },
                            },
                        },
                        ai: {
                            combo: 'radiance_huisheng',
                        },
                        action_tag: {
                            combo: 1,
                            sha_bonus: 2,
                            draw: 0.5,
                            range: 0.5,
                            directHit: 0.5,
                            demand_sha: 1,
                        },
                    },
                    "radiance_wenyi": {
                        trigger: {
                            global: "recoverAfter",
                        },
                        intro: {
                            content: 'players',
                        },
                        init: function(player) {
                            if (!player.storage.radiance_wenyi) player.storage.radiance_wenyi = [];
                        },
                        filter: function(event, player) {
                            if (event.player == player) return false;
                            return event.num > 0 && event.player.countCards('he') > 0;
                        },
                        logTarget: "player",
                        check: function(event, player) {
                            return get.attitude(player, event.player) < 0;
                        },
                        content: function() {
                            trigger.player.chooseToDiscard('he', 1, true);
                        },
                        ai: {
                            threaten: 1.6,
                            expose: 0.5,
                        },
                        group: ['radiance_wenyi_damage', 'radiance_wenyi_record'],
                        subSkill: {
                            record: {
                                trigger: {
                                    global: 'recoverAfter',
                                },
                                forced: true,
                                silent: true,
                                charlotte: true,
                                popup: false,
                                sub: true,
                                firstDo: true,
                                filter: function(event, player) {
                                    return event.player != player;
                                },
                                content: function() {
                                    player.storage.radiance_wenyi.add(trigger.player);
                                    player.markSkill('radiance_wenyi');
                                },
                            },
                            damage: {
                                trigger: {
                                    player: 'phaseJieshuBegin',
                                },
                                direct: true,
                                filter: function(event, player) {
                                    return player.storage.radiance_wenyi.length > 0;
                                },
                                content: function() {
                                    'step 0'
                                    player.chooseTarget(get.prompt('radiance_wenyi'), '对一名回合回复过体力的其他角色造成一点伤害', function(card, player, target) {
                                        return player.storage.radiance_wenyi.contains(target);
                                    }).set('ai', function(target) {
                                        var player = _status.event.player;
                                        return get.damageEffect(target, player, player);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.storage.radiance_wenyi = [];
                                        player.unmarkSkill('radiance_wenyi');
                                        var target = result.targets[0];
                                        player.logSkill('radiance_wenyi', target);
                                        target.damage();
                                    }
                                },
                            },
                        },
                        action_tag: {
                            overall: 4,
                            damage: 1,
                            discard: 2,
                        },
                    },


                    // nnonhuman
                    "radiance_jiaoyan": {
                        enable: 'phaseUse',
                        filter: function(event, player) {
                            // if (player.getStat('damage') && player.getStat('damage') > 0) return false;
                            var targets = game.filterPlayer2(function(target) {
                                return target != player;
                            });
                            for (var i = 0; i < targets.length; i++) {
                                if (targets[i].getHistory('damage', function(evt) {
                                        return evt.num > 0 && evt.getParent('phaseUse', true) == event.getParent() && evt.source == player;
                                    }).length > 0) return false;
                            };
                            return player.countCards('he', function(card) {
                                return get.tag(card, 'damage');
                            }) > 0;
                        },
                        filterCard: function(card, player) {
                            return get.tag(card, 'damage');
                        },
                        position: 'he',
                        check: function(card) {
                            return 7.1 - get.value(card);
                        },
                        discard: false,
                        lose: false,
                        delay: false,
                        filterTarget: function(card, player, target) {
                            if (ui.selected.targets.length == 0) {
                                return player != target;
                            } else {
                                return ui.selected.targets[0].canUse('sha', target, false);
                            }
                        },
                        selectTarget: 2,
                        multitarget: true,
                        prompt: "将一张伤害牌交给一名角色，然后选择令其使用【杀】的目标",
                        targetprompt: ['得到牌', '出杀目标'],
                        content: function() {
                            'step 0'
                            event.card = cards[0];
                            if (get.type(event.card) == 'equip') {
                                player.$give(event.card, targets[0], true);
                                targets[0].equip(event.card);
                            } else {
                                targets[0].gain(event.card, player, 'give');
                            };

                            player.getHistory('custom').push({
                                radiance_jiaoyan: true,
                            });
                            player.addTempSkill('radiance_jiaoyan_source', 'radiance_jiaoyanEnd');
                            'step 1'
                            targets[0].chooseToUse({
                                name: 'sha'
                            }, '对' + get.translation(targets[1]) + '使用一张【杀】').set('targetRequired', true).set('complexSelect', true).set('filterTarget', function(card, player, target) {
                                return target == _status.event.target2 && _status.event.source.canUse({
                                    name: 'sha'
                                }, target, false);
                            }).set('ai1', function(card) {
                                if (get.name(card) != 'sha') return -1;
                                var source = _status.event.source;
                                var target2 = _status.event.target2;
                                if (source.isTurnedOver()) return -1;
                                if (get.attitude(source, target2) > 0) {
                                    if (4 - source.countCards('h') >= 3) return -1;
                                    if (source.countCards('h') == 1 || source.countCards('h') >= 4) return 10;
                                    if (target2.hp > source.hp || target2.countCards('h', 'shan') > 0) return source.countCards('h') - 2;
                                }
                                return get.order(card);
                            }).set('ai2', function(target) {
                                var source = _status.event.source;
                                if (source.isTurnedOver()) return -1;

                                if (get.attitude(source, target) > 0) {
                                    if (4 - source.countCards('h') >= 3) return -1;
                                    if (source.countCards('h') == 1 || source.countCards('h') >= 4) return 10;
                                    if (target.hp > source.hp || target.countCards('h', 'shan') > 0) return source.countCards('h') - 2;
                                }
                                return 1;
                            }).set('source', targets[0]).set('target2', targets[1]);
                            'step 2'
                            if (result.bool) {
                                player.gainPlayerCard(targets[0], 'he', 'visible', 'visibleMove', "获得" + get.translation(targets[0]) + "的一张非伤害牌").set('filterButton', function(button) {
                                    var player = _status.event.player;
                                    return !get.tag(button.link, 'damage');
                                });
                            } else {
                                targets[0].draw(4 - targets[0].countCards('h'));
                                targets[0].turnOver();
                            };
                        },
                        group: 'radiance_jiaoyan_lose',
                        subSkill: {
                            lose: {
                                trigger: {
                                    global: 'phaseJieshu'
                                },
                                forced: true,
                                silent: true,
                                sub: true,
                                charlotte: true,
                                popup: false,
                                filter: function(event, player) {
                                    return player.getHistory('custom', function(evt) {
                                        return evt.radiance_jiaoyan;
                                    }).length > 1;
                                },
                                content: function() {
                                    player.loseHp();
                                },
                            },
                            source: {
                                trigger: {
                                    global: 'damageBegin1'
                                },
                                forced: true,
                                charlotte: true,
                                silent: true,
                                popup: false,
                                sub: true,
                                firstDo: true,
                                priority: 100,
                                filter: function(event, player) {
                                    if (!event.getParent(4) || event.getParent(4).name != 'radiance_jiaoyan') return false;
                                    return (event.card && event.card.name == 'sha');
                                },
                                content: function() {
                                    'step 0'
                                    trigger.source = player;
                                },
                            },
                        },
                        ai: {
                            order: function(item, player) {
                                var num = player.getStat().skill.radiance_jiaoyan;
                                if (!num) {
                                    return 9;
                                };
                                if (num && player.hp == 1) return 0;
                                return 7;
                            },
                            result: {
                                target: function(player, target) {
                                    var card;
                                    if (ui.selected.cards.length > 0) {
                                        card = ui.selected.cards[0];
                                    } else {
                                        card = {
                                            name: 'sha'
                                        };
                                    }
                                    if (ui.selected.targets.length == 0) {
                                        if (target.isTurnedOver()) return 10;
                                        if (target.hasSkillTag('noturn')) return 0;
                                        if (target.countCards('h', 'sha') < 1 && card.name != 'sha') return -10;

                                        var max = 0;
                                        if (target.countCards('h', function(card) {
                                                if (!get.tag(card, ' damage')) {
                                                    max = Math.max(max, get.value(card, player));
                                                    return true;
                                                }
                                                return false;
                                            }) > 0) {
                                            return -max;
                                        }
                                        return -3;
                                    } else {
                                        return -1;
                                    }
                                },
                            },
                        },
                    },
                    "radiance_tianhua": {
                        trigger: {
                            player: "damageBegin4",
                        },
                        forced: true,
                        usable: 1,
                        init: function(player) {
                            if (typeof player.storage.radiance_tianhua != 'number') player.storage.radiance_tianhua = 2;
                        },
                        mark: true,
                        marktext: "华",
                        intro: {
                            content: '与其他角色计算距离时-#，其他角色与你计算距离时+#，手牌上限+#',
                        },
                        filter: function(event, player) {
                            var evt = event.getParent('useCard', true);
                            return evt && event.card && event.card == evt.card && event.source != player && event.num > 0;
                        },
                        content: function() {
                            'step 0'
                            trigger.cancel();
                            'step 1'
                            player.loseHp();
                            player.link(false);
                        },
                        group: 'radiance_tianhua_add',
                        global: 'radiance_tianhua_draw',
                        subSkill: {
                            add: {
                                trigger: {
                                    player: "loseHpAfter",
                                },
                                direct: true,
                                sub: true,
                                charlotte: true,
                                filter: function(event, player) {
                                    return true;
                                },
                                content: function() {
                                    'step 0'
                                    player.storage.radiance_tianhua += trigger.num;
                                    player.markSkill('radiance_tianhua');
                                },
                            },
                            draw: {
                                trigger: {
                                    player: 'phaseEnd'
                                },
                                forced: true,
                                sub: true,
                                filter: function(event, player) {
                                    return player.hasMark('radiance_tianhua');
                                },
                                content: function() {
                                    'step 0'
                                    player.draw(player.storage.radiance_tianhua);
                                    'step 1'
                                    player.removeMark('radiance_tianhua', 1, false);
                                },
                            },
                        },
                        mod: {
                            globalFrom: function(from, to, distance) {
                                if (typeof from.storage.radiance_tianhua == 'number') return distance - from.storage.radiance_tianhua;
                            },
                            globalTo: function(from, to, distance) {
                                if (typeof to.storage.radiance_tianhua == 'number') return distance + to.storage.radiance_tianhua;
                            },
                            maxHandcard: function(player, current) {
                                if (typeof player.storage.radiance_tianhua == 'number') return current + player.storage.radiance_tianhua;
                            }
                        },
                        ai: {
                            threaten: 0.9,
                        },
                        action_tag: {
                            overall: 2.5,
                            range: 1,
                            draw: 1.5,
                            loseHp_defend: 1,
                        },
                    },
                    "radiance_diewu": {
                        trigger: {
                            global: 'phaseUseBegin',
                        },
                        init: function(player, skill) {
                            if (typeof player.storage.radiance_diewu != 'string') player.storage.radiance_diewu = 'male';
                        },
                        filter: function(event, player) {
                            return event.player.sex == player.storage.radiance_diewu;
                        },
                        check: function(event, player) {
                            var att = get.attitude(player, event.player);
                            if (att > 0) return (!event.player.needsToDiscard(-2) && event.player.hp > 1) || (event.player.countCards('h', function(card) {
                                return event.player.getUseValue(card) > 0 && get.name(card, event.player) > 1;
                            }) > 1);
                            return true;
                        },
                        logTarget: 'player',
                        content: function() {
                            'step 0'
                            player.draw(1);
                            trigger.player.addTempSkill('radiance_diewu_af');
                        },
                    },
                    "radiance_diewu_af": {
                        charlotte: true,
                        locked: true,
                        mod: {
                            maxHandcard: function(player, current) {
                                return current - 1;
                            },
                            cardUsable: function(card, player, num) {
                                if (card.name == 'sha') return num + 1;
                            },
                        },
                    },
                    "radiance_fengying": {
                        trigger: {
                            player: ['phaseZhunbeiBegin', 'damageEnd'],
                        },
                        filter: function(event, player) {
                            if (event.name == 'damage' && event.num < 1) return false;
                            return true;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            if (player.countCards('h') > player.hp) {
                                player.chooseCardTarget({
                                    filterCard: true,
                                    filterTarget: function(card, player, target) {
                                        return target != player;
                                    },
                                    selectCard: player.countCards('h') - player.hp,
                                    selectTarget: [0, 1],
                                    ai1: function(card) {
                                        var player = _status.event.player;
                                        if (_status.event.du) return -get.value(card, player, 'raw');
                                        return 7 - get.value(card, player, 'raw');
                                    },
                                    ai2: function(target) {
                                        var att = get.attitude(_status.event.player, target);
                                        if (_status.event.du) return 0.5 - att;
                                        var nh2 = target.countCards('h') + target.hp * 1.5;
                                        var num = Math.sqrt(1 + nh2);
                                        return Math.max(att, 1) / num;
                                    },
                                    du: player.hasCard(function(card) {
                                        return get.value(card, player, 'raw') < 0;
                                    }),
                                    prompt: "风影",
                                    prompt2: "将超出体力值的手牌交给其他角色或弃置，然后回复一点体力",
                                });
                            } else {
                                event.goto(3);
                            };
                            'step 1'
                            if (result.bool) {
                                if (result.targets.length > 0) {
                                    // if (!player.isUnderControl(true) && get.attitude(player, result.targets[0]) < 0) {
                                    //    player.logSkill('radiance_fengying');
                                    //    player.discard(result.cards);
                                    // } else {};
                                    player.logSkill('radiance_fengying', result.targets[0]);
                                    player.give(result.cards, result.targets[0], false);
                                } else {
                                    player.logSkill('radiance_fengying');
                                    player.discard(result.cards);
                                };
                            } else {
                                event.goto(3);
                            }
                            'step 2'
                            if (player.isDamaged()) {
                                player.recover();
                                event.finish();
                            };
                            'step 3'
                            player.chooseBool("风影：是否将“蝶舞”的性别切换至" + (player.storage.radiance_diewu == 'female' ? "男" : "女") + "性？").set('ai', function(event, player) {
                                var num1 = game.countPlayer(function(target) {
                                        return target.sex == player.storage.radiance_diewu;
                                    }),
                                    num2 = game.countPlayer(function(target) {
                                        return target.sex != player.storage.radiance_diewu && ['male', 'female'].contains(target.sex);
                                    });
                                if (num2 - num1 > 0) return true;
                                return false;
                            });
                            'step 4'
                            if (result.bool) {
                                player.logSkill('radiance_fengying');
                                player.storage.radiance_diewu = player.storage.radiance_diewu == 'female' ? 'male' : 'female';
                                game.log(player, "切换了", 'radiance_fengying', "的性别，现在为", player.storage.radiance_diewu);
                            };
                        },
                    },

                    "radiance_danda": {
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
                                    trigger.player.damage(2, player);
                                } else if (event.type == 2) {
                                    trigger.target.draw(2, player);
                                    player.draw(2, player);
                                } else {
                                    player.gainPlayerCard(trigger.player, 'he', 1);
                                    var sha = trigger.cards.filterInD('od');
                                    if (sha && sha.length) player.gain(sha, 'gain2', 'log');
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
                    "radiance_fenqi": {
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
                            if (typeof player.storage.radiance_fenqi != 'boolean') player.storage.radiance_fenqi = false;
                        },
                        filter: function(event, player) {
                            return (!player.storage.radiance_fenqi);
                        },
                        content: function() {
                            'step 0'
                            player.awakenSkill('radiance_fenqi');
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
                            player.gain(event.cards, 'gain2', 'log');
                            player.storage.radiance_fenqi_af = event.cards;
                            player.addTempSkill('radiance_fenqi_af');
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
                    "radiance_fenqi_af": {
                        mark: true,
                        intro: {
                            mark: function(dialog, storage, player, skill) {
                                if (!player.storage.radiance_fenqi_af) return;
                                dialog.add('获得的牌（点击【绽放】按钮查看手牌中剩余的牌）');
                                dialog.addSmall(player.storage.radiance_fenqi_af);
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
                                if (player.storage.radiance_fenqi_af && player.storage.radiance_fenqi_af.contains(card)) {
                                    return true;
                                }
                            },
                            cardDiscardable: function(card, player, name) {
                                if (name == 'phaseDiscard' && player.storage.radiance_fenqi_af && player.storage.radiance_fenqi_af.contains(card)) {
                                    return false;
                                }
                            },
                        },
                        onremove: function(player, skill) {
                            delete player.storage.radiance_fenqi_af;
                        },
                        enable: 'phaseUse',
                        filter: function(event, player) {
                            if (!Array.isArray(player.storage.radiance_fenqi_af)) return false;
                            return player.countCards('h', function(card) {
                                return player.storage.radiance_fenqi_af.contains(card);
                            }) > 0;
                        },
                        filterCard: function(card, player) {
                            if (!Array.isArray(player.storage.radiance_fenqi_af)) return false;
                            return player.storage.radiance_fenqi_af.contains(card);
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

                    "radiance_yidai": {
                        trigger: {
                            player: 'die'
                        },
                        forced: true,
                        forceDie: true,
                        skillAnimation: true,
                        animationColor: 'thunder',
                        filter: function(event) {
                            return event.source && event.source.isIn();
                        },
                        content: function() {
                            trigger.source.addSkill('radiance_yidai');
                        },
                        logTarget: 'source',
                        mod: {
                            attackFrom: function(from, to, current) {
                                return current + 1;
                            },
                        },
                        action_tag: {
                            overall: -1,
                            deterrence: 1,
                            negative: 1,
                        },
                        ai: {
                            neg: true,
                        }
                    },
                    "radiance_renlin": {
                        trigger: {
                            global: ["loseAfter", "cardsDiscardAfter", "gameDrawAfter"],
                        },
                        frequent: true,
                        locked: false,
                        filter: function(event, player) {
                            if (event.name == 'gameDraw') return true;
                            var cards = (event.cards2 || event.cards);
                            if (!cards) return false;
                            if (event.name == 'lose') {
                                if ((event.type != 'discard' && event.type != 'equip') || event.player == player) return false;
                            } else {
                                var evt = event.getParent();
                                if (evt.name != 'orderingDiscard' || (evt.relatedEvent && evt.relatedEvent.player == player)) return false;
                            };
                            for (var i = 0; i < cards.length; i++) {
                                if (get.type(cards[i]) == 'equip' && get.subtype(cards[i]) == 'equip1' && get.position(cards[i], true) == 'd') return true;
                            };
                            return false;
                        },
                        init: function(player, skill) {
                            if (typeof player.storage.radiance_renlin != 'boolean') player.storage.radiance_renlin = false;
                        },
                        content: function() {
                            'step 0'
                            if (trigger.name == 'gameDraw') {
                                var card = get.cardPile(function(card) {
                                    return get.type(card) == 'equip' && get.subtype(card) == 'equip1';
                                });
                                if (card) {
                                    player.$gain(card, 'gain2');
                                    player.equip(card);
                                }
                                event.finish();
                            }
                            'step 1'
                            event.cards = [];
                            var cards = trigger.cards2 || trigger.cards;
                            for (var i = 0; i < cards.length; i++) {
                                if (get.type(cards[i]) == 'equip' && get.subtype(cards[i]) == 'equip1' && get.position(cards[i], true) == 'd') event.cards.push(cards[i]);
                            }
                            'step 2'
                            player.gain(event.cards, 'gain2', 'log');
                        },
                        group: 'radiance_renlin_save',
                        subSkill: {
                            save: {
                                trigger: {
                                    global: 'dyingBegin',
                                },
                                filter: function(event, player) {
                                    if (player.storage.radiance_renlin || event.player.hp > 0) return false;
                                    return player.countCards('he', {
                                        subtype: 'equip1'
                                    }) > 0;
                                },
                                direct: true,
                                skillAnimation: 'epic',
                                animationColor: 'metal',
                                content: function() {
                                    'step 0'
                                    player.chooseCardTarget({
                                        prompt: "刃林",
                                        prompt2: "重铸任意数量的武器牌，令一名濒死的角色回复",
                                        filterCard: function(card, player) {
                                            return get.subtype(card) == 'equip1';
                                        },
                                        position: 'he',
                                        selectCard: [1, Infinity],
                                        filterTarget: function(card, player, target) {
                                            return target.hp <= 0;
                                        },
                                        ai1: function(card) {
                                            return 9.1 - get.value(card);
                                        },
                                        ai2: function(target) {
                                            var player = _status.event.player;
                                            var zhu = get.zhu(player);
                                            if (zhu == target) return get.recoverEffect(target, player, player);
                                            var friends = player.getFriends();
                                            if (zhu == player && friends.contains(target)) return (player.hp > 2 ? get.recoverEffect(target, player, player) : -1);
                                            return get.recoverEffect(target, player, player) - 2;
                                        },
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('radiance_renlin_save', result.targets[0]);
                                        player.storage.radiance_renlin = true;
                                        event.num = result.cards.length;
                                    } else {
                                        event.finish();
                                    };
                                    'step 2'
                                    player.lose(result.cards, ui.discardPile, 'visible');
                                    player.$throw(result.cards, 1000);
                                    player.draw(event.num);
                                    'step 3'
                                    trigger.player.recover(event.num, player, 'nocard');
                                },
                            },
                        },
                        mod: {
                            ignoredHandcard: function(card, player) {
                                if (get.subtype(card) == 'equip1') {
                                    return true;
                                }
                            },
                            cardDiscardable: function(card, player, name) {
                                if (name == 'phaseDiscard' && get.subtype(card) == 'equip1') {
                                    return false;
                                }
                            },
                        },
                        action_tag: {
                            overall: 3,
                            combo: 1,
                            reuse: 1,
                        },
                    },
                    "radiance_jianxing": {
                        enable: 'phaseUse',
                        filter: function(event, player) {
                            return player.countCards('he', function(card) {
                                return get.type(card) == 'equip' && get.subtype(card) == 'equip1';
                            }) > 0 && !(player.hasSkill('radiance_jianxing_u') && player.hasSkill('radiance_jianxing_h') && player.hasSkill('radiance_jianxing_d') && player.hasSkill('radiance_jianxing_r'));
                        },
                        chooseButton: {
                            dialog: function(event, player) {
                                var players = game.players.slice(0);
                                players.sort(lib.sort.seat);
                                var map = {
                                    'd': "伤害",
                                    'h': "回复",
                                    'u': "使用",
                                    'r': "复原",
                                };
                                var list = ['d', 'h', 'u', 'r'];
                                if (player.hasSkill('radiance_jianxing_d')) list.remove('d');
                                if (player.hasSkill('radiance_jianxing_h')) list.remove('h');
                                if (player.hasSkill('radiance_jianxing_u')) list.remove('u');
                                if (player.hasSkill('radiance_jianxing_r')) list.remove('r');

                                var dialog = ui.create.dialog('剑醒', 'hidden');
                                var table = document.createElement('div');
                                table.classList.add('add-setting');
                                table.style.margin = '0';
                                table.style.width = '100%';
                                table.style.position = 'relative';
                                for (var i = 0; i < list.length; i++) {
                                    var current = list[i];
                                    var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                                    td.innerHTML = '<span>' + map[current] + '</span>';
                                    td.link = current;
                                    td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                                    for (var j in lib.element.button) {
                                        td[j] = lib.element.button[j];
                                    }
                                    table.appendChild(td);
                                    dialog.buttons.add(td);
                                }
                                dialog.content.appendChild(table);

                                dialog.addText("目标角色");
                                dialog.add(players);
                                return dialog;
                            },
                            filter: function(button, player) {
                                if (ui.selected.buttons.length == 0) return (typeof button.link == 'string');
                                if (ui.selected.buttons.length == 1) {
                                    if (typeof button.link == 'string') return false;
                                    var selected = ui.selected.buttons[0].link;
                                    if (selected == 'd') return button.link != player;
                                    if (selected == 'u') return button.link != player && !button.link.getEquip(1);
                                    if (selected == 'h') return button.link.isDamaged();
                                    if (selected == 'r') return button.link.isTurnedOver() || button.link.isLinked();
                                };
                                return false;
                            },
                            select: 2,
                            complexSelect: true,
                            check: function(button) {
                                var player = _status.event.player;
                                if (player.countCards('he', function(card) {
                                        return get.type(card) == 'equip' && get.subtype(card) == 'equip1';
                                    }) <= 1) return -1;
                                var zhu = get.zhu(player);
                                if (ui.selected.buttons.length == 0) {
                                    if (typeof button.link != 'string') return -1;
                                    if (zhu && zhu.isDamaged() && get.recoverEffect(zhu, player, player) > 1 && button.link == 'h') return 15;
                                    if (game.countPlayer(function(target) {
                                            return get.damageEffect(target, player, player) > 0 && target.hp == 1;
                                        }) && button.link == 'd') return 9;
                                    if (game.countPlayer(function(target) {
                                            return get.attitude(player, target) > 1 && target.isTurnedOver();
                                        }) && button.link == 'r') return 8;
                                    if (game.countPlayer(function(target) {
                                            return get.recoverEffect(target, player, player) > 0 && target.hp <= 2;
                                        }) && button.link == 'h') return 7;
                                    if (game.countPlayer(function(target) {
                                            return get.damageEffect(target, player, player) > 0;
                                        }) && button.link == 'd') return 6;
                                    if (game.countPlayer(function(target) {
                                            return (get.realAttitude || get.attitude)(player, target) > 0 && !target.getEquip(1) && target != player;
                                        }) && button.link == 'u') return 4;
                                    if (game.countPlayer(function(target) {
                                            return get.recoverEffect(target, player, player) > 0;
                                        }) && button.link == 'h') return 2;
                                    return 0;
                                };
                                if (ui.selected.buttons.length == 1) {
                                    var selected = ui.selected.buttons[0].link;
                                    if (typeof button.link == 'string') return 0;
                                    var target = button.link;
                                    switch (selected) {
                                        case 'u':
                                            {
                                                return (get.realAttitude || get.attitude)(player, target);
                                                break;
                                            }
                                        case 'd':
                                            {
                                                return get.damageEffect(target, player, player);
                                                break;
                                            }
                                        case 'h':
                                            {
                                                return get.recoverEffect(target, player, player);
                                                break;
                                            }
                                        case 'r':
                                            {
                                                if (target.isTurnedOver()) return get.attitude(player, target) - 1;
                                                break;
                                            }
                                        default:
                                            return 0;
                                            break;
                                    };
                                };
                                return 0;
                            },
                            backup: function(links, player) {
                                return {
                                    filterCard: function(card, player) {
                                        return get.type(card, player) == 'equip' && get.subtype(card) == 'equip1';
                                    },
                                    position: 'he',
                                    direct: true,
                                    selectCard: 1,
                                    discard: false,
                                    lose: false,
                                    delay: 0,
                                    check: function(card) {
                                        return 15 - get.value(card);
                                    },
                                    content: function() {
                                        'step 0'
                                        event.targetx = lib.skill.radiance_jianxing_backup.targetx;
                                        event.type = lib.skill.radiance_jianxing_backup.type;
                                        player.logSkill('radiance_jianxing', event.targetx);
                                        player.addTempSkill('radiance_jianxing_' + event.type, 'phaseUseEnd');
                                        if (event.type == 'd' || event.type == 'h') player.discard(cards);
                                        'step 1'
                                        if (event.type == 'd') {
                                            event.targetx.damage(1, player, 'nocard');
                                        } else if (event.type == 'h') {
                                            event.targetx.recover(1, player, 'nocard');
                                        } else if (event.type == 'u') {
                                            player.$give(cards, event.targetx, true);
                                            event.targetx.equip(cards[0]);
                                        } else if (event.type == 'r') {
                                            player.lose(cards, ui.cardPile, 'insert');
                                            game.log(player, '将', cards, '置于牌堆顶');
                                            game.broadcastAll(function(player) {
                                                var cardx = ui.create.card();
                                                cardx.classList.add('infohidden');
                                                cardx.classList.add('infoflip');
                                                player.$throw(cardx, 1000, 'nobroadcast');
                                            }, player);
                                            event.targetx.turnOver(false);
                                            event.targetx.link(false);
                                        };
                                    },
                                    type: links[0],
                                    targetx: links[1],
                                    ai: {
                                        order: 3,
                                        result: {
                                            player: function(player, target) {
                                                return 1;
                                            },
                                        },
                                        expose: 0.3,
                                    },
                                };
                            },
                            prompt: function(links, player) {
                                var map = {
                                    'd': "弃置一张武器牌并对" + get.translation(links[1]) + "造成一点伤害",
                                    'h': "弃置一张武器牌并令" + get.translation(links[1]) + "回复一点体力",
                                    'u': "令" + get.translation(links[1]) + "装备一张武器牌",
                                    'r': "置顶一张武器牌并令" + get.translation(links[1]) + "复原",
                                };
                                return map[links[0]];
                            },
                        },
                        ai: {
                            order: 3,
                            result: {
                                player: function(player, target) {
                                    return 1;
                                },
                            },
                            expose: 0.3,
                            combo: 'radiance_renlin',
                        },
                        locked: false,
                        mod: {
                            aiValue: function(player, card, num) {
                                if (get.type(card) == 'equip' && get.subtype(card) == 'equip1') {
                                    return num * 1.2;
                                }
                            },
                            aiOrder: function(player, card, num) {
                                if (get.type(card) == 'equip' && get.subtype(card) == 'equip1') {
                                    if (player.getEquip(1) && !(player.hasSkill('radiance_jianxing_d' && player.hasSkill('radiance_jianxing_h') && player.hasSkill('radiance_jianxing_u')))) {
                                        return 0.5;
                                    }
                                }
                            },
                        },
                        subSkill: {
                            d: {
                                charlotte: true,
                            },
                            h: {
                                charlotte: true,
                            },
                            u: {
                                charlotte: true,
                            },
                            r: {
                                charlotte: true,
                            },
                        },
                    },
                    "radiance_tenglong": {
                        trigger: {
                            global: "phaseUseBegin",
                        },
                        filter: function(event, player) {
                            if (event.player == player && player.storage.radiance_juesha == true && !player.hasCard('sha', 'h')) return false;
                            if (!player.hasSkillTag('respondSha') && player.countCards('h', 'sha') < 1) return false;
                            return event.player != player;
                        },
                        direct: true,
                        locked: true,
                        firstDo: true,
                        priority: 99999,
                        content: function() {
                            'step 0'
                            if (trigger.player == player && player.storage.radiance_juesha == true && !player.hasCard('sha', 'h')) {
                                player.logSkill('radiance_tenglong');
                                player.gain(get.cardPile(function(card) {
                                    return get.name(card) == 'sha';
                                }), 'gain2');
                                event.finish();
                            }
                            'step 1'
                            player.chooseToUse({
                                name: 'sha'
                            }, '腾龙：对' + get.translation(trigger.player) + '或他的上下家使用一张【杀】').set('targetRequired', true).set('complexSelect', true).set('filterTarget', function(card, player, target) {
                                var trigger = _status.event.getTrigger();
                                var player = _status.event.player;
                                if (target != trigger.player && target != trigger.player.getNext() && target != trigger.player.getPrevious()) return false;
                                return player.canUse({
                                    name: 'sha'
                                }, target, false);
                            });
                            'step 2'
                            if (result.bool) {
                                player.logSkill('radiance_tenglong');
                                player.draw();
                                player.addTempSkill('radiance_tenglong_af');
                                event.finish();
                            }
                        },
                        group: 'radiance_tenglong_sha',
                        subSkill: {
                            sha: {
                                trigger: {
                                    player: ['useCardBefore'],
                                },
                                filter: function(event, player) {
                                    return get.name(event.card) === 'sha' && player.storage.radiance_juesha === true;
                                },
                                forced: true,
                                silent: true,
                                firstDo: true,
                                priority: 600,
                                content: function() {
                                    game.countPlayer(function(current) {
                                        if (current != player && !current.hasSkill('radiance_tenglong_sha_db')) {
                                            current.addTempSkill('radiance_tenglong_sha_db', 'shaEnd');
                                        }
                                    });
                                },
                            },
                        },
                        ai: {
                            unequip_ai: true,
                            unequip: true,
                            skillTagFilter: function(player, tag, arg) {
                                if (arg && arg.name == 'sha') return true;
                                return false;
                            }
                        },
                        action_tag: {
                            overall: 6,
                            sha_multi: 3,
                            draw: 1,
                        },
                    },
                    "radiance_tenglong_af": {
                        charlotte: true,
                        forced: true,
                        mark: true,
                        marktext: "腾",
                        mod: {
                            globalTo: function(from, to, distance) {
                                return distance + 1;
                            },
                        },
                        intro: {
                            content: "其他角色与你计算距离时+1",
                        },
                    },
                    "radiance_tenglong_sha_db": {
                        inherit: 'fengyin',
                        mark: false,
                        charlotte: true,
                        debuff: true,
                        ai: {
                            neg: true,
                            unequip2: true,
                        },
                    },
                    "radiance_juesha": {
                        trigger: {
                            global: "dyingBegin",
                        },
                        firstDo: true,
                        priority: 1000,
                        unique: true,
                        mark: true,
                        skillAnimation: 'epic',
                        limited: true,
                        animationColor: 'fire',
                        intro: {
                            content: 'limited'
                        },
                        marktext: "绝",
                        init: function(player) {
                            if (typeof player.storage.radiance_juesha != 'boolean') player.storage.radiance_juesha = false;
                        },
                        filter: function(event, player) {
                            return (!player.storage.radiance_juesha);
                        },
                        logTarget: 'player',
                        check: function(event, player) {
                            if (event.player.hp < 0) return false;
                            return get.attitude(player, event.player) < 0;
                        },
                        content: function() {
                            'step 0'
                            player.awakenSkill('radiance_juesha');
                            player.draw(3);
                            'step 1'
                            trigger.player.hp = trigger.player.hp - 1;
                            trigger.player.update();
                        },
                        ai: {
                            expose: 0.5,
                        },
                        action_tag: {
                            overall: 4,
                            limited: 1,
                            combo: 1,
                            draw: 1.5,
                            loseHp: 1,
                        },
                    },
                    "radiance_gongfa": {
                        trigger: {
                            global: 'useCardToPlayer'
                        },
                        filter: function(event, player) {
                            if (!event.isFirstTarget) return false;
                            if (player.getEquip(2)) return false;
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
                            player.gain(trigger.cards.filterInD('od'), 'gain2', 'log');
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
                                target.loseHp();
                            }
                        },
                        ai: {
                            order: 10,
                            result: {
                                target: -1,
                            },
                        },
                    },
                    "radiance_weihao": {
                        mod: {
                            targetInRange: function(card, player, target) {
                                var num = player.getHistory('useCard', function(evt) {
                                    return evt.card.name == 'sha'
                                }).length;
                                if (num == 0 && get.name(card) == 'sha') return true;
                            },
                            selectTarget: function(card, player, range) {
                                var num = player.getHistory('useCard', function(evt) {
                                    return evt.card.name == 'sha'
                                }).length;
                                if (num == 0 && get.name(card) == 'sha') {
                                    range[0] = -1;
                                    range[1] = -1;
                                };
                            },
                        },
                        locked: true,
                        group: ['radiance_weihao_draw', 'radiance_weihao_after'],
                        subSkill: {
                            draw: {
                                trigger: {
                                    player: 'shaHit',
                                },
                                filter: function(event, player) {
                                    var num = player.getHistory('useCard', function(evt) {
                                        return evt.card.name == 'sha'
                                    }).length;
                                    return num == 1;
                                },
                                forced: true,
                                sub: true,
                                content: function() {
                                    player.draw();
                                },
                            },
                            after: {
                                trigger: {
                                    player: ['useCardEnd'],
                                },
                                forced: true,
                                sub: true,
                                filter: function(event, player) {
                                    var used = player.getHistory('useCard', function(evt) {
                                        return evt.card.name == 'sha'
                                    });
                                    return used.length == 1 && used[0] == event;
                                },
                                content: function() {
                                    var bool2 = game.hasPlayer2(function(current) {
                                        return current.getHistory('damage', function(evt) {
                                            return evt.card && evt.card == trigger.card;
                                        }).length > 0;
                                    });
                                    if (bool2) player.loseHp();
                                },
                            },
                        },
                        action_tag: {
                            overall: 1,
                            negative: 1,
                            draw: 1,
                            sha_bonus: 1,
                        },
                        ai: {
                            halfneg: true,
                        },
                    },


                    // ffree
                    "radiance_weiyong": {
                        trigger: {
                            global: 'phaseUseBegin'
                        },
                        filter: function(event, player) {
                            return !event.player.hasSkill('radiance_weiyong') && !event.player.hasSkill('radiance_weiyong_give');
                        },
                        locked: true,
                        direct: true,
                        content: function() {
                            'step 0'
                            player.chooseCard('h', 1, '是否交给' + get.translation(trigger.player) + '一张手牌令其获得“威勇”的效果？').set('ai', function(card) {
                                if (trigger.player.hasSkill('nsfzxys_bingdu_db') || get.attitude(player, trigger.player) < 1) return 0;
                                if (trigger.player.countCards('h', 'sha') > 0) return 5 - get.value(card);
                                if (trigger.player.countCards('h', 'sha') < 1 && get.name(card) == 'sha') return 6 - get.value(card);
                                return 0;
                            });
                            'step 1'
                            if (result.bool) {
                                player.logSkill('radiance_weiyong', trigger.player);
                                trigger.player.gain(result.cards, player, 'giveAuto');
                                trigger.player.addTempSkill('radiance_weiyong_give');
                                game.delay();
                            }
                        },
                        group: 'radiance_weiyong_give',
                        ai: {
                            expose: 0.2,
                        }
                    },
                    "radiance_weiyong_give": {
                        trigger: {
                            player: 'useCardToPlayered',
                        },
                        filter: function(event) {
                            return event.card.name == 'sha';
                        },
                        forced: true,
                        charlotte: true,
                        logTarget: 'target',
                        content: function() {
                            var id = trigger.target.playerid;
                            var map = trigger.getParent().customArgs;
                            if (!map[id]) map[id] = {};
                            if (typeof map[id].shanRequired == 'number') {
                                map[id].shanRequired += 1;
                            } else {
                                map[id].shanRequired = 2;
                            }
                        },
                        mod: {
                            globalFrom: function(from, to, distance) {
                                return distance - 1;
                            },
                        },
                    },
                    "radiance_yingzhi": {
                        trigger: {
                            global: 'shaHit'
                        },
                        filter: function(event, player) {
                            if (!event.player.isIn()) return false;
                            return !player.storage.radiance_yingzhi.contains(event.target);
                        },
                        check: function(event, player) {
                            return true;
                        },
                        init: function(player) {
                            if (!player.storage.radiance_yingzhi) player.storage.radiance_yingzhi = [];
                        },
                        content: function() {
                            'step 0'
                            player.storage.radiance_yingzhi.add(trigger.target);
                            'step 1'
                            var num = 1;
                            if (trigger.player.hasSkill('radiance_weiyong') || trigger.player.hasSkill('radiance_weiyong_give')) num++;
                            player.draw(num);
                        },
                        global: 'radiance_yingzhi_clear',
                        subSkill: {
                            clear: {
                                trigger: {
                                    global: 'roundStart'
                                },
                                forced: true,
                                charlotte: true,
                                popup: false,
                                silent: true,
                                firstDo: true,
                                filter: function(event, player) {
                                    return player.storage.radiance_yingzhi && player.storage.radiance_yingzhi.length > 0;
                                },
                                content: function() {
                                    'step 0'
                                    player.storage.radiance_yingzhi.length = 0;
                                },
                            },
                        },
                    },
                    "radiance_chilie": {
                        trigger: {
                            player: ['phaseZhunbeiBegin', 'phaseJudgeBefore', 'phaseJieshuBegin'],
                        },
                        forced: true,
                        filter: function(event, player) {
                            return true;
                        },
                        content: function() {
                            'step 0'
                            if (trigger.name == 'phaseZhunbei') {
                                player.draw(3);
                            } else if (trigger.name == 'phaseJudge') {
                                trigger.cancel();
                            } else {
                                player.loseHp();
                            }
                        },
                        mod: {
                            targetInRange: function(card, player, target) {
                                return true;
                            },
                            cardUsable: function(card, player, num) {
                                if (card.name == 'sha') return num + 1;
                            },
                            maxHandcardFinal: function(player, num) {
                                return Infinity;
                            },
                        },
                        ai: {
                            threaten: 1.5,
                            effect: {
                                target: function(card, player, target, current) {
                                    if (get.type(card) == 'delay') return 0;
                                },
                            },
                        },
                    },
                    "radiance_yaoguang": {
                        trigger: {
                            player: ['useCard', 'respond']
                        },
                        init: function(player, skill) {
                            if (!Array.isArray(player.storage.radiance_yaoguang)) player.storage.radiance_yaoguang = [];
                        },
                        filter: function(event, player) {
                            return get.type(event.card, player) == 'basic' && !player.storage.radiance_yaoguang.contains(get.name(event.card, player));
                        },
                        frequent: true,
                        content: function() {
                            player.storage.radiance_yaoguang.add(get.name(trigger.card, player));
                            player.draw();
                        },
                        ai: {
                            threaten: 2.2,
                        },
                        global: 'radiance_yaoguang_clear',
                        subSkill: {
                            clear: {
                                trigger: {
                                    player: 'changeHp'
                                },
                                forced: true,
                                charlotte: true,
                                popup: false,
                                silent: true,
                                firstDo: true,
                                filter: function(event, player) {
                                    return player.storage.radiance_yaoguang && event.num != 0;
                                },
                                content: function() {
                                    'step 0'
                                    player.storage.radiance_yaoguang.length = 0;
                                },
                            },
                        },
                    },
                    "radiance_bengyao": {
                        trigger: {
                            player: 'die'
                        },
                        forced: true,
                        skillAnimation: 'epic',
                        animationColor: 'metal',
                        forceDie: true,
                        filter: function(event, player) {
                            return event.source && event.source.isIn();
                        },
                        logTarget: 'source',
                        content: function() {
                            trigger.source.addSkill('radiance_bengyao_db');
                        },
                    },
                    "radiance_bengyao_db": {
                        trigger: {
                            player: 'phaseJieshu'
                        },
                        mark: true,
                        intro: {
                            content: '在结束阶段受到1点火焰伤害'
                        },
                        mark: true,
                        forced: true,
                        charlotte: true,
                        debuff: true,
                        content: function() {
                            'step 0'
                            player.damage(1, 'nosource', 'nocard', 'fire');
                        },
                        ai: {
                            neg: true,
                        }
                    },
                    "radiance_yingxue": {
                        trigger: {
                            player: ['damageEnd', 'phaseZhunbeiBegin'],
                            source: 'damageSource',
                        },
                        filter: function(event, player) {
                            if (event.name != 'damage') return true;
                            return event.num > 0;
                        },
                        marktext: "血",
                        intro: {
                            mark: function(dialog, storage, player, skill) {
                                dialog.addText("与其他角色计算距离时-" + storage + "，可以额外使用" + storage + "张【杀】");
                                if (player.stat[player.stat.length - 1].card.sha) {
                                    dialog.addText("本回合已使用" + player.stat[player.stat.length - 1].card.sha + "张【杀】");
                                };
                            },
                        },
                        init: function(player) {
                            if (!player.storage.radiance_yingxue) player.storage.radiance_yingxue = 0;
                        },
                        direct: true,
                        locked: false,
                        content: function() {
                            'step 0'
                            if (!event.count) event.count = trigger.num;
                            event.count--;
                            player.chooseControl(['摸牌', '获得血', 'cancel2'], function(event, player) {
                                if (player != _status.currentPhase) return 0;
                                if (player.countUsed('sha', true) > 0 && player.hasCard('sha', 'h')) return 1;

                                if (player.needsToDiscard() < 2) return 1;
                                return 0;
                            }).set('prompt', get.prompt("radiance_yingxue")).set('choiceList', [
                                '摸一张牌',
                                '与其他角色计算距离时-1，可以额外使用一张【杀】，结束阶段摸一张牌',
                            ]);
                            'step 1'
                            if (result.index == 0) {
                                player.logSkill('radiance_yingxue');
                                player.draw();
                            } else if (result.index == 1) {
                                player.logSkill('radiance_yingxue');
                                player.addMark('radiance_yingxue', 1);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (event.count > 0) event.goto(0);
                        },
                        global: "radiance_yingxue_end",
                        subSkill: {
                            end: {
                                trigger: {
                                    player: 'phaseJieshuBegin'
                                },
                                forced: true,
                                popup: false,
                                silent: true,
                                filter: function(event, player) {
                                    return player.storage.radiance_yingxue && player.storage.radiance_yingxue > 0;
                                },
                                content: function() {
                                    'step 0'
                                    player.logSkill('radiance_yingxue');
                                    var num = player.storage.radiance_yingxue;
                                    player.removeMark('radiance_yingxue', num);
                                    player.draw(num);
                                },
                            },
                        },
                        mod: {
                            cardUsable: function(card, player, num) {
                                if (card.name == 'sha') return num + player.storage.radiance_yingxue;
                            },
                            globalFrom: function(from, to, current) {
                                return current - from.storage.radiance_yingxue;
                            },
                        },
                    },
                    "radiance_zhoufa": {
                        trigger: {
                            player: 'die'
                        },
                        forced: true,
                        forceDie: true,
                        skillAnimation: true,
                        animationColor: 'thunder',
                        filter: function(event) {
                            return event.source && event.source.isIn();
                        },
                        content: function() {
                            trigger.source.addSkill('radiance_zhoufa_db');
                            if (!trigger.source.hasJudge('shandian')) {
                                var card = get.cardPile('shandian', 'field');
                                if (!card) card = game.createCard('shandian');
                                trigger.source.$draw(card);
                                trigger.source.addJudge(card);
                                game.delay();
                            }
                        },
                        logTarget: 'source',
                        ai: {
                            threaten: function(player, target) {
                                if (target.hp == 1) return 0.2;
                                return 1.5;
                            },
                            effect: {
                                target: function(card, player, target, current) {
                                    if (!target.hasFriend()) return;
                                    if (target.hp <= 1 && get.tag(card, 'damage')) return [1, 0, 0, -2];
                                }
                            }
                        }
                    },
                    "radiance_zhoufa_db": {
                        charlotte: true,
                        debuff: true,
                        mark: true,
                        marktext: '罚',
                        intro: {
                            name: '咒罚',
                            content: '【闪电】的效果必中',
                        },
                        mod: {
                            judge: function(player, result) {
                                if (_status.event.cardname == 'shandian') {
                                    result.bool = false;
                                    result.judge = -6;
                                }
                            }
                        },
                        ai: {
                            neg: true,
                        }
                    },
                    "radiance_zhanque": {
                        trigger: {
                            player: 'useCardToPlayered',
                        },
                        filter: function(event) {
                            return event.card.name == 'sha';
                        },
                        logTarget: 'target',
                        content: function() {
                            'step 0'
                            trigger.target.chooseTarget('斩却：选择一名响应的其他角色', true, function(card, player, target) {
                                return target != _status.event.player;
                            }).set('ai', function(target) {
                                var player = _status.event.player;
                                return get.attitude(target, player) * target.countCards('h');
                            });
                            'step 1'
                            if (result.bool) {
                                event.target2 = result.targets[0];
                                trigger.target.line(event.target2);
                                game.log(trigger.target, "选择了", event.target2);
                                event.target2.chooseToRespond({
                                    name: 'shan'
                                }).set('ai', function(card) {
                                    var trigger = _status.event.getTrigger();
                                    var player = _status.event.player;
                                    if (get.attitude(player, trigger.target) <= 0) return 0;
                                    if (get.effect(trigger.target, trigger.card, trigger.player, player) > get.effect(player, {
                                            name: 'sha',
                                            isCard: true,
                                        }, trigger.player, player)) return 0;
                                    return 10 - get.useful(card);
                                }).set('prompt', "打出一张【闪】，否则" + get.translation(trigger.target) + "不能闪避【杀】");
                            };
                            'step 2'
                            if (!result.bool) {
                                trigger.getParent().directHit.push(trigger.target);
                                var id = trigger.target.playerid;
                                var map = trigger.getParent().customArgs;
                                if (!map[id]) map[id] = {};
                                if (typeof map[id].extraDamage != 'number') {
                                    map[id].extraDamage = 0;
                                }
                                map[id].extraDamage++;
                            };
                        },
                    },
                    "radiance_xiangyun": {
                        trigger: {
                            player: ['useCard', 'respond'],
                            target: 'useCardToTargeted',
                        },
                        filter: function(event, player) {
                            if (get.suit(event.card) != 'heart') return false;
                            return true;
                        },
                        frequent: true,
                        locked: false,
                        content: function() {
                            player.draw();
                        },
                        ai: {
                            effect: {
                                target: function(card, player, target, current, isLink) {
                                    if (get.suit(card) == 'heart') return [0.8, 0, 0.8, 0]; // [对目标效果倍率，对目标效果加算，使用者收益倍率，使用者收益加算]
                                },
                                player: function(card, player, target) {
                                    if (get.suit(card) == 'heart') return [1.2, 0, 1, 0]; // [使用者收益倍率，使用者收益加算，对目标效果倍率，对目标效果加算]
                                }
                            },
                        },
                        mod: {
                            aiValue: function(player, card, num) {
                                if (get.suit(card) == 'heart') {
                                    return num * 1.2;
                                }
                            },
                            aiOrder: function(player, card, num) {
                                if (get.suit(card) == 'heart' && num > 0) {
                                    //if (player = _status.currentPhase) return 1.2 * num;
                                    return num + 0.5;
                                }
                            },
                            ignoredHandcard: function(card, player) {
                                if (get.suit(card) == 'heart') {
                                    return true;
                                }
                            },
                            cardDiscardable: function(card, player, name) {
                                if (name == 'phaseDiscard' && get.suit(card) == 'heart') {
                                    return false;
                                }
                            },
                        },
                    },
                    "radiance_baiyi": {
                        enable: "phaseUse",
                        usable: 1,
                        filterTarget: function(card, player, target) {
                            if (player == target) return false;
                            return true;
                        },
                        filterCard: true,
                        selectCard: [1, Infinity],
                        position: "h",
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        check: function(card) {
                            if (!ui.selected.cards.length) return 7 - get.value(card);
                            return 5 - get.value(card);
                        },
                        content: function() {
                            'step 0'
                            event.num = cards.length;
                            var str = "弃置" + get.cnNumber(event.num * 2) + "张手牌，或受到一点伤害并令" + get.translation(player) + "摸" + get.cnNumber(event.num) + "张牌";
                            target.chooseToDiscard('h', str, event.num * 2).set('ai', function(card) {
                                if (!target.hasSkillTag('nodamage')) return 8 - _status.event.player.hp - get.value(card);
                                return 0;
                            });
                            'step 1'
                            if (!result.bool) {
                                target.damage(1, 'nocard');
                            } else {
                                event.finish();
                            }
                            'step 2'
                            player.draw(event.num);
                        },
                        ai: {
                            order: 11,
                            result: {
                                target: function(player, target) {
                                    if (target.hasSkillTag('nodamage')) return 0;
                                    var cs = ui.selected.cards.length;
                                    var hs = target.countCards('h') * 2;

                                    if (hs > cs) {
                                        return Math.min(get.damageEffect(target, player) + hs - cs, -1);
                                    } else {
                                        return get.damageEffect(target, player);
                                    }
                                    return 0;
                                },
                            },
                        },
                        action_tag: {
                            overall: 5,
                            damage: 1,
                            change: 1,
                            discard: 0.5,
                            in: 1,
                        }
                    },
                    "radiance_fengxing": {
                        trigger: {
                            target: 'useCardToTarget',
                        },
                        filter: function(event, player) {
                            if (player.hp < 1) return false;
                            var card = event.card;
                            return (get.name(card) == 'sha');
                        },
                        prompt: function(event, player) {
                            return '是否失去一点体力并取消【' + get.translation(event.card) + '】？';
                        },
                        check: function(event, player) {
                            if (event.getParent().excluded.contains(player)) return false;
                            var card = event.card;
                            var eff = get.effect(player, card, event.player, player);
                            if (eff >= 0) return false;
                            if (player.hp > 1 && get.attitude(player, event.player) > 0) return true;

                            var id = player.playerid;
                            var map = event.getParent().customArgs;
                            var need = 1;
                            if (get.tag(card, 'respondShan')) {
                                if (map[id] && typeof map[id].shanRequired == 'number') need = map[id].shanRequired;
                                if (player.countCards('h', {
                                        name: 'shan'
                                    }) < need) {
                                    return true;
                                };
                            };
                            return false;
                        },
                        content: function() {
                            'step 0'
                            player.loseHp(1);
                            'step 1'
                            game.delayx();
                            trigger.getParent().targets.remove(player);
                            trigger.getParent().triggeredTargets2.remove(player);
                            'step 2'
                            event.cards = get.cards(2);
                            game.cardsGotoOrdering(event.cards);
                            player.showCards(event.cards, '风行');
                            'step 3'
                            var max = Math.max(get.number(event.cards[0]), get.number(event.cards[1]));
                            var min = Math.min(get.number(event.cards[0]), get.number(event.cards[1]));
                            var str = (max == min) ? '弃置一张点数与' + min + '相同的手牌' : '弃置一张点数在[' + min + ', ' + max + ']之间的手牌';
                            str += '，或令' + get.translation(player) + '回复一点体力';
                            trigger.player.chooseToDiscard('h', str, 1, function(card) {
                                var num = get.number(card);
                                return num <= max && num >= min;
                            }).set('ai', function(card) {
                                var trigger = _status.event.getTrigger();
                                var player = _status.event.getParent().player;
                                var cards = _status.event.getParent().cards;

                                if (get.effect(player, trigger.card, trigger.player, _status.event.player) <= 0) return 0;
                                if (get.attitude(trigger.player, player) >= 0) return 0;
                                if (get.tag(cards[0], 'save') || get.tag(cards[1], 'save')) return 0;
                                return 7.1 - get.value(card);
                            });
                            'step 4'
                            if (result.bool) {
                                player.gain(event.cards, 'gain2', 'log');
                            } else {
                                player.recover();
                            };
                        },
                        ai: {
                            threaten: 1.6,
                            effect: {
                                target: function(card, player, target, current) {
                                    if (get.name(card) != 'sha') return 1; //if (!get.tag(card, 'damage')) return 1;
                                    if (target.hp > 1 && get.attitude(player, target) > 0) return 0;
                                    return Math.min(0.5, player.countCards('h') / 10);
                                }
                            }
                        },
                        action_tag: {
                            overall: 5,
                            loseHp_defend: 3,
                        }
                    },
                    "radiance_wanxiang": {
                        trigger: {
                            player: 'phaseUseBegin'
                        },
                        direct: true,
                        locked: false,
                        filter: function(event, player) {
                            return player.countCards('h') > 0;
                        },
                        content: function() {
                            'step 0'
                            player.chooseTarget(get.prompt2('radiance_wanxiang'), function(card, player, target) {
                                return player.canCompare(target);
                            }).set('ai', function(target) {
                                return -get.attitude(_status.event.player, target) / target.countCards('h');
                            });
                            'step 1'
                            if (result.bool) {
                                player.logSkill('radiance_wanxiang', result.targets[0]);
                                player.chooseToCompare(result.targets[0]);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (result.bool) {
                                var list = [];
                                for (var i = 0; i < lib.inpile.length; i++) {
                                    var name = lib.inpile[i];
                                    if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                                };
                                list.sort(lib.sort.card);
                                event.list = list;
                                if (list.length == 0) {
                                    event.finish();
                                    return ui.create.dialog('万象无可用牌');
                                };
                            } else {
                                player.addTempSkill('radiance_wanxiang_db');
                                player.gain(result.target, 'gain2', 'log');
                                event.finish();
                            };
                            'step 3'
                            var dialog = ui.create.dialog('视为使用一张非延时类锦囊牌', [event.list, 'vcard']);
                            player.chooseButton(dialog, true).ai = function(button) {
                                if (button.link[2] == 'wugu') return;
                                var effect = player.getUseValue(button.link[2]);
                                if (effect > 0) return effect;
                                return 0;
                            };
                            'step 4'
                            if (result.bool) {
                                player.chooseUseTarget({
                                    name: result.links[0][2]
                                }, false, 'nodistance').set('forced', true).set('logSkill', 'radiance_wanxiang');
                            }
                        },
                        action_tag: {
                            overall: 6,
                            discard: 1,
                            trick_viewAs: 2,
                            maxHand: 0.5,
                            negative: 0.5,
                        },
                    },
                    "radiance_wanxiang_db": {
                        charlotte: true,
                        forced: true,
                        debuff: true,
                        mod: {
                            cardEnabled2: function(card, player) {
                                if (get.type(card, 'trick', player) == 'trick') {
                                    return false;
                                }
                            },
                            ignoredHandcard: function(card, player) {
                                if (get.type(card, 'trick', player) == 'trick') {
                                    return true;
                                }
                            },
                            cardDiscardable: function(card, player, name) {
                                if (name == 'phaseDiscard' && get.type(card, 'trick', player) == 'trick') {
                                    return false;

                                };
                            },
                        },
                        ai: {
                            neg: true,
                        },
                    },
                    "radiance_qiongjiu": {
                        trigger: {
                            target: 'useCardToTargeted',
                        },
                        filter: function(event, player) {
                            if (player == event.player) return false;
                            if (player.hp < 1) return false;

                            var card = event.card;
                            if (get.name(card) == 'sha' || get.type(card) == 'trick') return true;
                            return false;
                        },
                        prompt: function(event, player) {
                            return '是否失去一点体力并无效【' + get.translation(event.card) + '】对你的效果？';
                        },
                        check: function(event, player) {
                            if (event.getParent().excluded.contains(player)) return false;
                            if (get.effect(player, event.card, event.player, player) >= 0) return false;
                            var card = event.card;
                            var id = player.playerid;
                            var map = event.getParent().customArgs;
                            var need = 1;
                            if (get.tag(card, 'respondSha')) {
                                if (map[id] && typeof map[id].shaReq == 'number') need = map[id].shaReq;
                                if (player.countCards('h', {
                                        name: 'sha'
                                    }) < need) {
                                    return true;
                                };
                            } else if (get.tag(card, 'respondShan')) {
                                if (map[id] && typeof map[id].shanRequired == 'number') need = map[id].shanRequired;
                                if (player.countCards('h', {
                                        name: 'shan'
                                    }) < need) {
                                    return true;
                                };
                            } else if (get.tag(card, 'damage') && get.name(card) != 'huogong') {
                                return true;
                            };
                            return false;
                        },
                        content: function() {
                            'step 0'
                            player.loseHp(1);
                            'step 1'
                            trigger.getParent().excluded.add(player);
                            if (player.countCards('he') == 0) {
                                event.finish();
                            };
                            game.delay();
                            'step 2'
                            var str = "将一张牌置于弃牌堆，然后获得一张点数为此牌的倍数或因数的牌";
                            player.chooseCard('he', str).set('ai', function(card) {
                                var num = get.number(card);
                                var count = 0;
                                for (var i = 1; i < 14; i++) {
                                    if (num % i == 0 || i % num == 0) count++;
                                }
                                return count;
                            });
                            'step 3'
                            if (result.bool) {
                                player.lose(result.cards, ui.discardPile, 'visible');
                                player.$throw(result.cards, 1000);
                                game.log(player, '将', result.cards, '置入了弃牌堆');
                                event.num = get.number(result.cards[0]);
                                event.card = result.cards[0];
                                game.updateRoundNumber();
                            } else {
                                event.finish();
                            }
                            'step 4'
                            event.togain = [];
                            for (var i = 0; i < ui.discardPile.childNodes.length; i++) {
                                var current = ui.discardPile.childNodes[i];
                                if (get.number(current) % event.num === 0 || event.num % get.number(current) === 0) {
                                    event.togain.push(current);
                                };
                            };
                            if (!event.togain.contains(event.card)) event.togain.push(event.card);
                            player.chooseButton(['获得其中的一张牌', event.togain], true).set('ai', function(button) {
                                return _status.event.player.getUseValue(button.link);
                            });
                            'step 5'
                            if (result.bool) {
                                player.gain(result.links[0], 'gain2', 'log');
                            };
                        },
                        action_tag: {
                            overall: 3,
                            loseHp_defend: 0.5,
                            search: 1,
                        },
                    },

                    "radiance_chenji": {
                        enable: "phaseUse",
                        filterTarget: function(card, player, target) {
                            if (player == target) return false;
                            return player.countCards('h', function(cardx) {
                                return lib.skill.radiance_chenji.filterCard(cardx, player);
                            }) > 0;
                        },
                        intro: {
                            content: function(storage, player, skill) {
                                var list = player.getSkills(null, false, false).filter(function(i) {
                                    return lib.skill.radiance_chenji.skillBlocker(i, player);
                                });
                                if (list.length) return '失效技能：' + get.translation(list);
                                return '无失效技能';
                            },
                        },
                        filterCard: function(card, player) {
                            if (player.storage.radiance_chenji_suit) return player.storage.radiance_chenji_suit == get.suit(card, player);
                            return get.color(card) == 'black';
                        },
                        selectCard: 1,
                        position: "h",
                        skillBlocker: function(skill, player) {
                            return !lib.skill[skill].charlotte;
                        },
                        check: function(card) {
                            var player = _status.event.player;
                            if (player.storage.radiance_chenji_suit) return 5.1 - get.value(card);
                            return 7.1 - get.value(card);
                        },
                        content: function() {
                            'step 0'
                            player.storage.radiance_chenji_suit = get.suit(cards[0]);
                            target.addMark('radiance_chenji', 1);
                            if (!target.storage.skill_blocker || !target.storage.skill_blocker.contains('radiance_chenji')) target.addSkillBlocker('radiance_chenji');
                            game.log(target, "的技能因为", 'radiance_chenji', "失效了");
                        },
                        ai: {
                            order: function(item, player) {
                                var num = player.getStat().skill.radiance_chenji;
                                if (!num || num < 2) {
                                    return 99;
                                }
                                return 4.1;
                            },
                            result: {
                                target: function(player, target) {
                                    if (target.countMark('radiance_chenji') > 1 || target.hasSkill('radiance_jixing')) return 0;
                                    var skills = target.getSkills(true, false);
                                    if (skills.length < 1) return 0;
                                    var base = -10;
                                    for (var i = 0; i < skills.length; i++) {
                                        var info = lib.skill[skills[i]];
                                        if (info && info.zero) base += 3;
                                    }
                                    return Math.min(base, 0);
                                },
                            },
                            threaten: 2.1,
                        },
                        global: "radiance_chenji_disable",
                    },
                    "radiance_chenji_disable": {
                        trigger: {
                            player: 'phaseAfter',
                        },
                        forced: true,
                        charlotte: true,
                        popup: false,
                        content: function() {
                            'step 0'
                            delete player.storage.radiance_chenji_suit;
                            'step 1'
                            player.removeMark('radiance_chenji', 1);
                            'step 2'
                            if (player.countMark('radiance_chenji') < 1) {
                                player.removeSkillBlocker('radiance_chenji');
                                game.log(player, "解除了", 'radiance_chenji_disable', "状态");
                            };
                        },
                    },


                    "radiance_zhaoyao": {
                        trigger: {
                            player: 'phaseUseBegin',
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            var max = -1;
                            for (var i = 0; i < game.players.length; i++) {
                                if (game.players[i].isOut() || game.players[i] == player) continue;
                                max = Math.max(max, game.players[i].countCards('h'));
                            };
                            event.max = max;
                            player.chooseControl('一', '二', '三', 'cancel2').set('prompt', '招摇：选择摸牌数，当前场上其他角色最高手牌数为' + max).set('ai', function(event, player) {
                                var hs = player.countCards('h');
                                if (event.max - hs >= 3) return 2;
                                if (hs < event.max) return event.max - player.countCards('h') - 1;
                                if (hs == 0) return 2;
                                if (player.hp > 2 || player.countCards('h', 'tao') > 0 || (player.hp < 2 && player.countCards('h', 'jiu') > 0)) {
                                    return 2;
                                }
                                return 3;
                            });
                            'step 1'
                            if (result.control != 'cancel2') {
                                player.logSkill('radiance_zhaoyao');
                                player.draw(result.index + 1);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (player.isMaxHandcard(true)) {
                                player.chooseControl('失去体力', '使用一张牌').set('prompt', '招摇：失去一点体力出牌阶段只能使用一张牌').set('ai', function() {
                                    if (player.hp > 2 || player.countCards('h', 'tao') > 0 || (player.hp < 2 && player.countCards('h', 'jiu') > 0)) {
                                        return 0;
                                    }
                                    var hs = player.getCards('h');
                                    var count = 0;
                                    for (var i = 0; i < hs.length; i++) {
                                        if (player.getUseValue(hs[i]) > 4) count++;
                                    }
                                    if (count >= player.needsToDiscard() && player.hp > 1) return 0;
                                    return 1;
                                });
                            } else {
                                event.finish();
                            }
                            'step 3'
                            if (result.index == 0) {
                                player.loseHp();
                            } else {
                                trigger.skipped = true;
                            }
                        },
                    },
                    "radiance_jianshang": {
                        trigger: {
                            player: ['phaseDiscardEnd'],
                        },
                        direct: true,
                        filter: function(event, player) {
                            var cards = [];
                            event.player.getHistory('lose', function(evt) {
                                if (evt && evt.getParent('phaseDiscard') == event && evt.hs) cards.addArray(evt.hs);
                            });
                            return cards.filterInD('d').length > 0;
                        },
                        content: function() {
                            'step 0'
                            var cards = [];
                            player.getHistory('lose', function(evt) {
                                if (evt && evt.getParent('phaseDiscard') == trigger && evt.hs) cards.addArray(evt.hs);
                            });
                            event.cards = cards.filterInD('d');
                            player.chooseTarget('令一名其他角色成为“奸商”的对象', lib.filter.notMe).set('ai', function(target) {
                                var player = _status.event.player;
                                var att = get.attitude(player, target);
                                var length = _status.event.cards.length;
                                if (target.countCards('h') == 0 && att > 0) return -1;
                                if (length >= 3 && att > 0 && target.hp > 2) return target.hp + att;
                                if (length <= 2 && target.countCards('h') > 1) return -att;
                                if (target.hp < 2 && att < 0 && length <= 3 && target.countCards('h') > 1) return 2 - att;
                                return 0;
                            }).set('cards', event.cards);
                            'step 1'
                            if (result.bool) {
                                event.target = result.targets[0];
                                player.logSkill('radiance_jianshang', event.target);
                                player.line(event.target);
                                player.chooseCardButton(event.cards, '奸商：选择任意张你于此阶段弃置的牌', true, [1, event.cards.length]).set('ai', function(button) {
                                    var target = _status.event.target;
                                    var player = _status.event.player;
                                    var att = get.attitude(player, target);
                                    var length = _status.event.cards.length;
                                    var val = get.value(button.link, target);

                                    if (ui.selected.buttons.length > 0 && att > 0) return 0;
                                    if (target.countCards('h') == 0 && att > 0) return val + 10;
                                    if (length >= 3 && att > 0 && target.hp > 2) return 10 - val;
                                    if (length <= 2 && target.countCards('h') > 1) return 10 - val;
                                    if (target.hp < 2 && att < 0 && length <= 3 && target.countCards('h') > 1) return 5 + val;
                                    return val;
                                }).set('target', event.target).set('cards', event.cards);
                            } else {
                                event.finish();
                            }
                            'step 2'
                            if (result.bool && result.links.length) {
                                event.cardsx = result.links;
                                event.cards.removeArray(event.cardsx);
                                var value1 = 0,
                                    value2 = 0;
                                for (var i = 0; i < event.cardsx.length; i++) {
                                    value1 += get.value(event.cardsx[i], event.target);
                                }; // 给牌拿的牌
                                for (var i = 0; i < event.cards.length; i++) {
                                    value2 += get.value(event.cards[i], event.target);
                                }; // 掉血拿的牌

                                event.target.chooseCard(event.cardsx.length, 'h').set('ai', function(card) {
                                    var target = _status.event.player;
                                    var player = _status.event.getParent().player;
                                    var val = 0;
                                    for (var i = 0; i < ui.selected.cards.length; i++) {
                                        val += get.value(ui.selected.cards[i]);
                                    };
                                    var value1 = _status.event.value1;
                                    var value2 = _status.event.value2;

                                    if (get.attitude(target, player) > 1) {
                                        if (value1 >= value2) return 10 - val;
                                        if (value1 < value2 + 7 && target.hp > 1) return 0;
                                    };
                                    if (target.hp < 2 && target.countCards('h', function(cardx) {
                                            return get.tag(cardx, 'save');
                                        }) == 0) return 7 - val;

                                    return value1 * 1.5 - val - get.value(card);
                                }).set('value1', value1).set('value2', value2).set('prompt', '是否将' + get.cnNumber(event.cardsx.length) + "张手牌交给" +
                                    get.translation(player) + "并获得" + get.translation(event.cardsx));
                            }
                            'step 3'
                            if (result.bool) {
                                event.target.give(result.cards, player, false);

                            } else {
                                event.target.loseHp();
                                event.goto(5);
                            }
                            'step 4'
                            event.target.gain(event.cardsx, 'gain2');
                            event.finish();
                            'step 5'
                            if (event.target.isIn() && event.cards.length > 0) {
                                event.target.gain(event.cards, 'gain2');
                            }
                        },
                    },
                    "radiance_baoji": {
                        trigger: {
                            global: 'damageBegin1',
                        },
                        filter: function(event, player) {
                            return event.player != player && event.card && (get.name(event.card) == 'sha' || get.name(event.card) == 'juedou') && event.source && event.source == player && player.isIn() && event.notLink();
                        },
                        check: function(event, player) {
                            return get.damageEffect(event.player, player, player) > 0;
                        },
                        logTarget: 'player',
                        content: function() {
                            'step 0'
                            player.judge(function(card) {
                                if (get.color(card) == 'black') return 1;
                                return -1;
                            });
                            'step 1'
                            if (result.bool) {
                                trigger.num++;
                                event.finish();
                            } else {
                                player.chooseBool('暴击：是否失去一点体力，令此伤害+1？').set('ai', function() {
                                    if (player.hp < 2 || trigger.player.getEquip('baiyin')) return false;
                                    return trigger.player.hp < player.hp + 1;
                                });
                            }
                            'step 2'
                            if (result.bool) {
                                trigger.num++;
                                player.loseHp();
                            }
                        },
                    },
                    "radiance_jiabei": {
                        trigger: {
                            player: 'gainBefore',
                        },
                        filter: function(event, player) {
                            return event.cards.length > 0 && event.getParent().name == 'draw';
                        },
                        frequent: true,
                        content: function() {
                            'step 0'
                            event.cards = trigger.cards;
                            var list = ['red', 'black', 'spade', 'heart', 'club', 'diamond'];
                            var str = "加倍：请声明一个颜色或花色";
                            player.chooseControl(list).set('prompt', str).set('ai', function(event, player) {
                                if (event.cards.length == 1) return [0, 1].randomGet();
                                if (event.cards.length == 2) return [0, 1, 2, 3, 4, 5].randomGet();
                                return [2, 3, 4, 5].randomGet();
                            });
                            'step 1'
                            event.control = result.control;
                            game.log(player, '声明了', event.control, '牌');
                            player.popup(event.control);
                            event.bool = false;
                            for (var i = 0; i < event.cards.length; i++) {
                                var currentcard = event.cards[i];
                                if (get.color(currentcard) == event.control && ['red', 'black'].contains(event.control)) {
                                    event.bool = 1;
                                    break;
                                } else if (get.suit(currentcard) == event.control && !['red', 'black'].contains(event.control)) {
                                    event.bool = 2;
                                    break;
                                }
                            }
                            'step 2'
                            if (event.bool) {
                                game.log('radiance_jiabei', "：将要获得的牌中有", event.control, "牌");
                                game.log(player, "额外摸了", get.cnNumber(event.bool), "张牌");
                                trigger.getParent().num += event.bool;
                                var cards = get.cards(event.bool);
                                trigger.cards.addArray(cards);
                            }
                        },
                    },
                    "radiance_wenyu": {
                        mark: true,
                        intro: {
                            mark: function(dialog, storage, player, skill) {
                                var list = game.filterPlayer();
                                var str = '所有角色当前所需的牌数：<br>';
                                var num;
                                for (var i = 0; i < list.length; i++) {
                                    var id = list[i].playerid;
                                    if (typeof player.storage.radiance_wenyu[id] != 'number') {
                                        num = 2;
                                    } else {
                                        num = player.storage.radiance_wenyu[id];
                                    }
                                    str += get.translation(list[i]) + '：' + num + '<br>';
                                }
                                return str;
                            },
                        },
                        init: function(player) {
                            if (!player.storage.radiance_wenyu) player.storage.radiance_wenyu = {};
                        },
                        enable: "phaseUse",
                        filterCard: true,
                        position: "he",
                        filter: function(event, player) {
                            if (player.hasSkill('radiance_wenyu_used')) return false;
                            if (!game.hasPlayer(function(current) {
                                    return current.isDamaged();
                                })) return false;
                            return player.countCards('he') > 0;
                        },
                        check: function(card) {
                            var player = _status.event.player;
                            var base = 0;
                            var targets = game.filterPlayer();
                            for (var i = 0; i < targets.length; i++) {
                                if (get.attitude(player, targets[i]) <= 0 || !targets[i].isDamaged()) continue;
                                var id = targets[i].playerid;
                                if (typeof player.storage.radiance_wenyu[id] != 'number') {
                                    base = Math.max(base, 2);
                                } else {
                                    base = Math.max(player.storage.radiance_wenyu[id], base);
                                };
                            };

                            if (ui.selected.cards.length >= Math.min(base, 3)) {
                                return 0;
                            }
                            if (player.needsToDiscard()) {
                                return 8 - player.getUseValue(card);
                            }
                            return 6 - player.getUseValue(card);
                        },
                        selectCard: [1, Infinity],
                        prompt: '选择一名角色回复一点体力',
                        filterTarget: function(card, player, target) {
                            if (!target.isDamaged()) return false;
                            var length = ui.selected.cards.length;
                            var id = target.playerid;
                            var num;
                            if (typeof player.storage.radiance_wenyu[id] != 'number') {
                                num = 2;
                            } else {
                                num = player.storage.radiance_wenyu[id];
                            }
                            return length == num;
                        },
                        content: function() {
                            'step 0'
                            target.recover();
                            'step 1'
                            player.judge(function(card) {
                                if (get.suit(card) == 'heart') return 6;
                                if (get.color(card) == 'black') return -1;
                                return 0;
                            });
                            'step 2'
                            var id = target.playerid;
                            if (result.judge <= 0) {
                                if (typeof player.storage.radiance_wenyu[id] != 'number') {
                                    player.storage.radiance_wenyu[id] = 3;
                                } else {
                                    player.storage.radiance_wenyu[id]++;
                                };
                                if (result.judge < 0) {
                                    player.addTempSkill('radiance_wenyu_used');
                                }
                            };
                        },
                        ai: {
                            order: function(item, player) {
                                var num = player.getStat().skill.radiance_wenyu;
                                if (!num) {
                                    return 9;
                                } else if (num == 1) {
                                    return 4;
                                } else if (num == 2) {
                                    return 2;
                                }
                                return 1;
                            },
                            result: {
                                target: function(player, target) {
                                    return 1 + target.getDamagedHp();
                                },
                            },
                            threaten: 1.5,
                        },
                        group: 'radiance_wenyu_reduce',
                        subSkill: {
                            used: {
                                charlotte: true,
                            },
                            reduce: {
                                trigger: {
                                    global: 'dyingBegin'
                                },
                                filter: function(event, player) {
                                    var id = event.player.playerid;
                                    if (typeof player.storage.radiance_wenyu[id] != 'number') return true;
                                    return player.storage.radiance_wenyu[id] > 1;
                                },
                                forced: true,
                                sub: true,
                                popup: false,
                                content: function() {
                                    var id = trigger.player.playerid;
                                    if (typeof player.storage.radiance_wenyu[id] == 'number') {
                                        player.storage.radiance_wenyu[id] -= 1;
                                    } else {
                                        player.storage.radiance_wenyu[id] = 1;
                                    }
                                },
                            },
                        },
                    },
                    "radiance_piaoling": {
                        trigger: {
                            player: 'judgeAfter'
                        },
                        frequent: true,
                        content: function() {
                            var num = 1;
                            if (trigger.result.suit == 'spade') num = 3;
                            player.draw(num);
                        },
                        action_tag: {
                            draw: 1,
                        },
                    },


                    "radiance_zaowu": {
                        enable: ['chooseToUse'],
                        init: function(player) {
                            player.storage.radiance_zaowu = 0;
                        },
                        filter: function(event, player) {
                            return !player.hasSkill('radiance_zaowu_used') && player.countCards('h') > 0;
                        },
                        filterCard: function(card, player) {
                            return true;
                        },
                        selectCard: 1,
                        position: 'hs',
                        check: function(card) {
                            var player = _status.event.player;
                            if (get.number(card) >= player.storage.radiance_zaowu && get.suit(card) == 'club') {
                                return 9 - get.value(card);
                            }
                            return 6 - get.value(card);
                        },
                        viewAs: {
                            name: 'wuzhong'
                        },
                        onuse: function(result, player) {
                            player.logSkill('radiance_zaowu');
                            if (get.number(result.card) >= player.storage.radiance_zaowu && get.suit(result.card) == 'club') {
                                player.storage.radiance_zaowu = get.number(result.card);
                            } else {
                                player.addTempSkill('radiance_zaowu_used', 'phaseUseEnd');
                            }
                        },
                        group: 'radiance_zaowu_clear',
                        subSkill: {
                            used: {
                                charlotte: true,
                            },
                            clear: {
                                trigger: {
                                    player: 'phaseUseEnd',
                                },
                                forced: true,
                                silent: true,
                                popup: false,
                                sub: true,
                                content: function() {
                                    player.storage.radiance_zaowu = 0;
                                },
                            },
                        },
                    },
                    "radiance_sanyuan": {
                        trigger: {
                            player: 'useCard1'
                        },
                        filter: function(event, player) {
                            if (event.card.name == 'sha') return true;
                        },
                        direct: true,
                        locked: false,
                        content: function() {
                            'step 0'
                            if (get.nature(trigger.card)) {
                                if (player.stat[player.stat.length - 1].card.sha > 0) {
                                    player.stat[player.stat.length - 1].card.sha--;
                                }
                                event.finish();
                            }
                            'step 1'
                            var list = [];
                            list.push(['基本', '', 'sha', 'fire']);
                            list.push(['基本', '', 'sha', 'thunder']);
                            list.push(['基本', '', 'sha', 'ice']);

                            player.chooseButton([get.prompt('radiance_sanyuan'), [list, 'vcard']]).set('ai', function(button) {
                                var eff = 0,
                                    target;
                                var nature = button.link[3];
                                for (var i = 0; i < _status.event.targets.length; i++) {
                                    target = _status.event.targets[i];

                                    var eff1 = get.damageEffect(target, _status.event.player, _status.event.player);
                                    var eff2 = get.damageEffect(target, _status.event.player, _status.event.player, nature);
                                    eff += eff2;
                                    eff -= eff1;
                                }
                                if (eff >= 0) return 1 + eff;
                                return 0;
                            }).set('targets', trigger.targets);
                            'step 2'
                            if (result.bool) {
                                player.logSkill('radiance_sanyuan');
                                game.log(player, "将【杀】的属性变为了", result.links[0][3]);
                                player.popup(get.translation(result.links[0][3]) + "杀");
                                trigger.card.nature = result.links[0][3];
                                if (get.itemtype(trigger.card) == 'card') {
                                    var next = game.createEvent('radiance_sanyuan_clear');
                                    next.card = trigger.card;
                                    event.next.remove(next);
                                    trigger.after.push(next);
                                    next.setContent(function() {
                                        delete card.nature;
                                    });
                                }
                            }
                        },
                        mod: {
                            targetInRange: function(card, player, target) {
                                if (card.name == 'sha' && card.nature !== undefined) {
                                    return true;
                                }
                            },
                            cardUsable: function(card, player, num) {
                                if (card.name == 'sha' && card.nature) return true;
                            },
                        },
                        group: 'radiance_sanyuan_prevent',
                        subSkill: {
                            prevent: {
                                trigger: {
                                    player: "damageBegin2",
                                },
                                forced: true,
                                locked: false,
                                sub: true,
                                filter: function(event, player) {
                                    if (!player.isEmpty(2)) return false;
                                    if (event.nature) return true;
                                    return false;
                                },
                                content: function() {
                                    trigger.cancel();
                                },
                            },
                        },
                        ai: {
                            nofire: true,
                            nothunder: true,
                            skillTagFilter: function(player, tag) {
                                if (tag == 'nofire' || tag == 'nothunder') {
                                    if (!player.isEmpty(2)) return false;
                                }
                            },
                            effect: {
                                target: function(card, player, target, current) {
                                    if (!target.isEmpty(2)) return;
                                    if (get.tag(card, 'natureDamage')) return 'zerotarget';
                                },
                            },
                        },
                    },
                    "radiance_yunjian": {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        filterCard: function(card) {
                            return get.type2(card) != 'basic';
                        },
                        selectCard: 1,
                        position: 'hes',
                        viewAs: {
                            name: 'sha',
                            radiance_yunjian: true,
                        },
                        filter: function(event, player) {
                            return player.countCards('he', function(card) {
                                return get.type2(card) != 'basic';
                            }) > 0;
                        },
                        precontent: function() {
                            player.addTempSkill('radiance_yunjian_af', 'phaseUseEnd');
                        },
                        onuse: function(result, player) {
                            player.logSkill('radiance_yunjian');
                        },
                        onrespond: function(result, player) {
                            player.logSkill('radiance_yunjian');
                        },
                        prompt: '将一张非基本牌当作【杀】使用或打出',
                        check: function(card) {
                            return 7 - get.value(card)
                        },
                        ai: {
                            respondSha: true,
                            skillTagFilter: function(player) {
                                return player.countCards('he', function(card) {
                                    return get.type2(card) != 'basic';
                                }) > 0;
                            },
                        },
                        locked: false,
                        mod: {
                            targetInRange: function(card, player, target) {
                                if (card.radiance_yunjian) return true;
                            },
                            cardUsable: function(card, player, num) {
                                if (card.radiance_yunjian) return Infinity;
                            },
                        },
                    },
                    "radiance_yunjian_af": {
                        charlotte: true,
                        locked: true,
                        forced: true,
                        popup: false,
                        silent: true,
                        firstDo: true,
                        trigger: {
                            player: 'useCard'
                        },
                        filter: function(event, player) {
                            return event.card && event.card.name == 'sha' && event.card.radiance_yunjian && event.addCount !== false;
                        },
                        content: function() {
                            if (player.stat[player.stat.length - 1].card.sha > 0) {
                                player.stat[player.stat.length - 1].card.sha--;
                            }
                        },
                        mod: {
                            attackFrom: function(player) {
                                return -Infinity;
                            },
                        },
                    },
                    "radiance_leiyin": {
                        trigger: {
                            player: 'phaseUseEnd',
                        },
                        filter: function(event, player) {
                            if (player.countCards('h') == 0) return false;

                            var num1 = player.getStat('damage') || 0;
                            var num2 = player.getHistory('useCard', function(evt) {
                                return evt.card && get.tag(evt.card, 'damage');
                            }).length;

                            return num2 > num1;
                        },
                        direct: true,
                        content: function() {
                            'step 0'
                            var num = player.getHistory('useCard', function(evt) {
                                return evt.card && get.tag(evt.card, 'damage');
                            }).length - (player.getStat('damage') || 0);
                            num = Math.min(num, 3);

                            var str = "是否弃置至多" + get.cnNumber(num) + "张手牌对一名角色造成等量的伤害？";
                            player.chooseCardTarget({
                                prompt: get.prompt('radiance_leiyin'),
                                prompt2: str,
                                filterCard: function(card, player) {
                                    return lib.filter.cardDiscardable(card, player);
                                },
                                position: 'h',
                                selectCard: function() {
                                    return [1, _status.event.count];
                                },
                                filterTarget: function(card, player, target) {
                                    return target != player;
                                },
                                ai1: function(card) {
                                    return 6.1 - get.value(card);
                                },
                                ai2: function(target) {
                                    var player = _status.event.player;
                                    if (target.hasSkillTag('nodamage') || target.hasSkillTag('nothunder')) return -1;
                                    return get.damageEffect(target, player, player, 'thunder');
                                },
                            }).set('count', num).set('targets', trigger.targets).set('p2', str);
                            'step 1'
                            if (result.bool && result.cards.length) {
                                player.discard(result.cards);
                                var target = result.targets[0];
                                player.logSkill('radiance_leiyin', target);
                                player.line(target, 'red');
                                target.damage(result.cards.length, 'thunder');
                            } else {
                                event.finish();
                            }
                        },
                        ai: {
                            expose: 0.4,
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
                    "radiance_jixing": {
                        trigger: {
                            player: ["damageBefore", "turnOverBefore"]
                        },
                        mark: true,
                        marktext: "星",
                        intro: {
                            mark: function(dialog, content, player) {
                                if (player != game.me) return '观看牌堆顶七张牌';
                                if (get.itemtype(_status.pileTop) != 'card') return '牌堆顶无牌';

                                var cards = [];
                                for (var i = 0; i < Math.min(7, ui.cardPile.childNodes.length); i++) {
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
                    "radiance_zhu": "主公",
                    "radiance_zhu_info": "<span class='firetext'>主公增强：</span>游戏开始时，你加X点体力上限；摸牌阶段，若有忠臣存活，你额外摸一张牌。你不会成为【乐不思蜀】的目标。当一名忠臣死亡后，若你的体力上限大于1，你减1点体力上限。（X为存活忠臣数）",
                    "radiance_losehp1": "失去体力1",
                    "radiance_losehp1_info": "当你成为其他角色的基本牌或非延时类的锦囊牌的目标后，你可以失去一点体力，令该牌对你无效。",
                    "radiance_losehp2": "失去体力2",
                    "radiance_losehp2_info": "当你成为一张其他角色的牌的目标时，你可以失去一点体力，然后取消此目标。",
                    "radiance_losehp3": "失去体力3",
                    "radiance_losehp3_info": "当你受到伤害时，你可以失去一点体力，然后取消之。",
                    "radiance_forbid": "禁牌",
                    "radiance_noequip2": "无视防具",
                    "radiance_wudi": "伤害无效",

                    "radiance_bofa": "博法",
                    "radiance_bofa_info": "你的准备阶段，当你受到伤害或失去体力后，你可以将牌堆顶一张牌置于你的武将牌上(至多五张)，然后你可以用任意数量的手牌与之交换。当其他角色使用牌时，你可以将一张与该牌花色相同的“博法”牌置于弃牌堆，然后取消此牌。",
                    "radiance_bofa_gain": "博法",
                    "radiance_xuehui": "学会",
                    "radiance_xuehui_info": "主公技，每回合限一次，当你一名与你势力相同的其他角色失去体力后，其可以令你摸一张牌。",
                    "radiance_tianyi": "天仪",
                    "radiance_tianyi_info": "每回合限一次，你可以将两张牌当作任意基本或非延时类锦囊牌使用或打出。",
                    "radiance_pofa": "破法",
                    "radiance_pofa_info": "当你成为其他角色锦囊牌的目标时，你可以失去一点体力并取消之。若如此做，直至回合结束，你不能成为锦囊牌的目标，在一张其他角色的锦囊牌进入弃牌堆后，你获得之。（至多三张）",
                    "radiance_pofa_af": "破法",
                    "radiance_zhisu": "质素",
                    "radiance_zhisu_info": "出牌阶段限一次，你观看牌堆顶的X张牌，然后选择获得这些牌中的任意牌；若剩余的牌中有点数为1、2、3、5、7、J、K的牌，你可以对一名其他角色造成等量的伤害。（X为你已损失的体力值且至少为1）",
                    "radiance_guiji": "轨迹",
                    "radiance_guiji_info": "当一名角色使用牌指定你为目标时，你可以令此牌对你无效并令一名其他角色代替你成为此牌的目标（可以选择非法角色）；若此牌不为伤害牌或目标数大于1，你摸两张牌。最后你失去一点体力。",
                    "radiance_aofa": "奥法",
                    "radiance_aofa_info": "每回合限一次，你可以执行一项：1.当你使用一张牌时，摸一张牌；2.当你成为伤害牌的目标后，摸两张牌。若此时不是你的回合且你执行了2，直至回合结束，每次你成为其他角色牌的目标后，若你手牌数大于体力值，需弃置一张手牌。",
                    "radiance_aofa_db": "奥法",
                    "radiance_jingyao": "晶耀",
                    "radiance_jingyao_info": "限定技，出牌阶段，你可以将至多两张牌置于武将牌上。你的准备阶段开始时，移除你武将牌上的一张牌。只要你武将牌上有牌，你“奥法”的摸牌数+1。",
                    "radiance_jingyao_af": "晶耀",
                    "radiance_lingyao": "灵药",
                    "radiance_lingyao_info": "出牌阶段限一次，你交给一名其他角色一张手牌。该角色选择是否对除你和其以外的角色使用此牌。若其使用之，你可以摸两张牌或回复一点体力；否则其不能使用或打出牌直至回合结束，然后失去一点体力。",
                    "radiance_mingyong": "命涌",
                    "radiance_mingyong_info": "锁定技，当你受到伤害时，改为失去一点体力。当你失去体力后，你展示当前回合角色的手牌。若其不为你，你可以弃置其至多三张花色相同的手牌；若你不能以此法弃牌，则你可以获得你手牌中缺少的花色的牌各一张。",

                    "radiance_yingcai": "英才",
                    "radiance_yingcai_info": "锁定技，你摸牌阶段额外摸一张牌，你的手牌上限和攻击范围+1。",
                    "radiance_tulong": "屠龙",
                    "radiance_tulong_info": "限定技，出牌阶段，你获得X张【杀】，直至回合结束，你使用【杀】无次数限制，无视目标角色的防具且需要额外使用一张【闪】来抵消。此回合结束时，你失去一点体力。（X为游戏轮数）",
                    "radiance_tulong_af": "屠龙",
                    "radiance_fengdong": "封冻",
                    "radiance_fengdong_info": "准备阶段，你可以选择一名有手牌的其他角色展示所有手牌，然后你选择其一个花色的手牌并选择一至两项：1.该角色每有一种此花色的牌，你摸一张牌；2.该角色本回合不能使用或打出与此花色不同的牌，受到此花色的牌造成的伤害+1。若同时选择两项，你失去一点体力。",
                    "radiance_fengdong_forbid": "封冻",
                    "radiance_jingti": "净体",
                    "radiance_jingti_info": "锁定技，若你没有装备防具牌，每回合你第一次受到伤害时，若此伤害无属性，防止之。",
                    "radiance_heidong": "黑洞",
                    "radiance_heidong_info": "出牌阶段限一次，你可以对所有其他角色各造成一点伤害，然后这些角色可以分别弃置你一张牌。",
                    "radiance_xuling": "虚灵",
                    "radiance_xuling_info": "当你成为其他角色的基本牌或非延时类的锦囊牌的目标后，你可以失去一点体力，令该牌对你无效，然后你可以令一名手牌数少于体力值的角色摸两张牌或令一名手牌数多于体力值的角色弃置两张手牌。",
                    "radiance_mojian": "魔剑",
                    "radiance_mojian_info": "锁定技，你的攻击范围+5，你的【杀】无视防具。",
                    "radiance_guanduan": "贯断",
                    "radiance_guanduan_info": "你使用【杀】指定目标后，可以根据满足以下条件的数目：·目标角色手牌数不大于你 ·目标角色体力值不大于你 ·目标角色装备区的牌数不大于你；执行以下效果：≥1：此【杀】需要额外使用一张【闪】响应；≥2：目标角色非锁定技失效直至回合结束；=3：目标角色弃置一张牌。",
                    "radiance_cangkong": "苍空",
                    "radiance_cangkong_info": "出牌阶段限一次，你可以废除“贯断”的一个条件或减一点体力上限，然后选择一名攻击范围内的角色，其随机弃置装备区和手牌区的各一张牌，然后受到一点伤害。",
                    "radiance_ponian": "破念",
                    "radiance_ponian_info": "出牌阶段限一次，你展示一名其他角色的一张手牌，然后你可以弃置一张手牌并弃置该角色展示的牌。若你弃置的牌与展示的牌颜色相同，你改为获得其展示的牌；且若花色也相同，你对其造成一点伤害。",
                    "radiance_hongguan": "虹冠",
                    "radiance_hongguan_info": "弃牌阶段开始时，你可以展示所有手牌，然后依次执行X次选择一项：1.摸一张牌；2.本回合手牌上限+1。（X为你展示的手牌中的花色数）",
                    "radiance_wanling": "万灵",
                    "radiance_wanling_info": "摸牌阶段，你可以放弃摸牌，改为展示并获得牌堆顶三张牌，然后你根据这些牌的点数和获得以下技能直至回合结束：·不大于18：“灵药”；·不小于24：“万象”。",
                    "radiance_fuxing": "辅星",
                    "radiance_fuxing_info": "你的弃牌阶段结束时，你可以令一名其他角色摸等同于你此阶段弃牌数的牌（至多三张）。其他角色的弃牌阶段结束时，若其本阶段有弃牌，你可以令其摸一张牌。",
                    "radiance_cheli": "彻理",
                    "radiance_cheli_info": "觉醒技，当你不因【杀】造成的伤害而进入濒死时，你失去技能“辅星”，减1点体力上限，回复体力至2点，修改“万灵”并获得技能“破法”。",

                    "radiance_yanzhen": "严阵",
                    "radiance_yanzhen_info": "转换技，当一张非延时类锦囊牌被【无懈可击】响应后：·阴：你可以获得该锦囊牌；·阳：若你非此【无懈可击】的使用者，你可以获得此【无懈可击】。你的非延时类锦囊牌不会被【无懈可击】响应。",
                    "radiance_yanzhen_ai": "严阵",
                    "radiance_hunlie": "魂烈",
                    "radiance_hunlie_info": "限定技，出牌阶段，你可以摸X张牌并获得X个“军魂”标记。（X为为你的已损失体力值+1且至少为3）",
                    "radiance_junhun": "军魂",
                    "radiance_junhun_info": "当你受到伤害时，可以移除一个“军魂”，令此伤害-1。当你需要使用或打出一张【杀】时，你可以选择移除一个“军魂”，视为使用或打出之。",
                    "radiance_junhun_sha": "军魂",
                    "radiance_junhun_damage": "军魂",
                    "radiance_shangwu": "尚武",
                    "radiance_shangwu_info": "主公技，其他与你势力相同的角色使用【杀】造成伤害后，可以令你判定一次。若为红色，你获得一个“军魂”标记。",
                    "radiance_weipo": "威迫",
                    "radiance_weipo_info": "出牌阶段开始时，你可以摸一张牌，然后展示至多三张伤害牌并摸X张牌。（X为你以此法展示的牌数）若你以此法展示了多于一张牌，你不能使用【杀】，以此法展示的牌不计入手牌上限，直至回合结束。",
                    "radiance_weipo_af": "威迫",
                    "radiance_xianzhuo": "险着",
                    "radiance_xianzhuo_info": "你可以将所有手牌当作【杀】、【闪】或【无懈可击】使用或打出。",
                    "radiance_xianzhuo_sha": "险着",
                    "radiance_xianzhuo_shan": "险着",
                    "radiance_xianzhuo_wuxie": "险着",
                    "radiance_danlue": "胆略",
                    "radiance_danlue_info": "一名角色的结束阶段，你可以将手牌补至两张。",

                    "radiance_feiren": "飞刃",
                    "radiance_feiren_info": "锁定技，你的攻击范围+1，你使用【杀】的目标上限+1。",
                    "radiance_qiaowu": "巧舞",
                    "radiance_qiaowu_info": "每回合限一次，当你需要使用或打出一张基本牌时，你可以视为使用或打出之；当前回合结束时，你需进行一次判定；若结果为基本牌，你获得判定牌并失去一点体力。",
                    "radiance_shouwu": "授武",
                    "radiance_shouwu_info": "每轮每项限一次，当一名角色使用的【杀】被【闪】响应后，你可以选择一项：1.将此【杀】交给一名角色，然后你摸一张牌；2.将此【闪】交给一名角色。",
                    "radiance_zhidou": "止斗",
                    "radiance_zhidou_info": "你可以将一张牌当作【杀】打出。",

                    "radiance_tangong": "贪功",
                    "radiance_tangong_info": "你使用【杀】的次数上限+1。你使用【杀】指定目标后，可以摸两张牌；则此【杀】首次被闪避后，你失去一点体力；若此【杀】未被闪避，你本回合不能再发动“贪功”。",
                    "radiance_zhengbian": "政变",
                    "radiance_zhengbian_info": "限定技，你的回合结束时，若此时不为第一轮，你可以令一名体力值不小于你的其他角色翻面，然后你进行一个额外的回合。",
                    "radiance_shouyue": "授钺",
                    "radiance_shouyue_info": "出牌阶段限一次，你可以将一张【杀】或武器牌交给其他角色，然后你摸两张牌。",
                    "radiance_tongguan": "统观",
                    "radiance_tongguan_info": "结束阶段，你可以摸X张牌；若你本回合没有使用【杀】造成伤害，你改为观看牌堆顶的4+X张牌并从中选择至多X张获得，然后将其余的牌以任意顺序置于牌堆顶或牌堆底。（X为你已损失的体力值且至少为1）",
                    "radiance_kuanzhi": "宽治",
                    "radiance_kuanzhi_info": "主公技，其他与你势力相同的角色使用【杀】被【闪】响应后，其可以你获得一个“军魂”标记。",
                    "radiance_muyi": "母仪",
                    "radiance_muyi_info": "当一名角色使用【杀】造成伤害后，若你已受伤，其可以弃置一张牌，然后令你回复一点体力。",
                    "radiance_muyi_gl": "母仪",
                    "radiance_shezheng": "摄政",
                    "radiance_shezheng_info": "出牌阶段限一次，你将一张手牌置于其他角色的武将牌上，该角色的出牌阶段开始时，其选择一项：1.获得此牌并视为使用了一张【杀】；2.将此牌置于弃牌堆，然后本回合该角色获得牌时，你摸一张牌。",
                    "radiance_shezheng_af": "摄政",
                    "radiance_shezheng_afdraw": "摄政",
                    "radiance_wubei": "武备",
                    "radiance_wubei_info": "摸牌阶段开始时，你若手牌中没有【杀】，你可以展示所有手牌，然后本阶段额外摸一张牌。",
                    "radiance_lizheng": "力争",
                    "radiance_lizheng_info": "当你使用的【杀】指定目标后，可以令目标角色选择一项：1.打出一张【杀】并令你摸一张牌，然后此【杀】对其无效且不计入使用次数限制；2.其受到一点对应牌为此【杀】的伤害。",
                    "radiance_kaiyang": "开阳",
                    "radiance_kaiyang_info": "出牌阶段，若你本回合没有造成过伤害，你可以弃置一张红色手牌并选择一名其他角色，该角色全部技能失效且不能使用或打出牌直至此技能结算完毕，然后你亮出牌堆顶两张牌。若这些牌中有红色牌，你对该角色造成一点火焰伤害。最后你获得展示牌中的伤害牌和武器牌。",
                    "radiance_kaiyang_db": "开阳",

                    "radiance_caopan": "操盘",
                    "radiance_caopan_info": "你的结束阶段，你可以选择至多三名其他角色，你令这些角色分别独立选择一项：1.交给你一张基本牌；2.弃置一张非基本牌；3.令你摸两张牌。若你选择了至少两名角色且他们的选择均相同，你回复一点体力；若你以此法获得了不少于三张牌，你翻面。",
                    "radiance_tunji": "囤积",
                    "radiance_tunji_info": "当你成为【杀】的目标后，若来源的装备区内的牌多于你，你可以将一张装备牌置于你的装备区；若你的装备区内没有防具，优先装备防具牌。",
                    "radiance_guchui": "鼓吹",
                    "radiance_guchui_info": "主公技，你受到伤害后，与你势力相同的角色可以选择受到一点无来源的伤害，则若你已翻面，你翻回正面；若你未翻面，你回复一点体力。",
                    "radiance_chizi": "池资",
                    "radiance_chizi_info": "限定技，出牌阶段，你获得X个“资”标记，然后获得三种类的牌各一张。每个准备阶段，你移除一个“资”标记，然后从牌堆中获得三种类的牌各一张。（X为游戏轮数。若能获得的牌不足三种则你获得但不移除标记）",
                    "radiance_chizi_af": "池资",
                    "radiance_longduan": "垄断",
                    "radiance_longduan_info": "摸牌阶段，你可以放弃摸牌，改为获得所有其他角色各一张手牌，然后弃置X张牌。（X为你的体力值）",
                    "radiance_suanjin": "算尽",
                    "radiance_suanjin_info": "锁定技，当你失去手牌或者装备区内的所有牌后，若你已受伤，你回复一点体力，否则你失去一点体力。",
                    "radiance_kongyin": "空音",
                    "radiance_kongyin_info": "出牌阶段每项各限一次：1.将一张手牌交给一名其他角色，令其失去一点体力；2.弃置至少两张花色各不同的手牌，令一名其他角色摸X张牌并翻面。（X为4减去弃置的牌数）",
                    "radiance_chuilian": "垂怜",
                    "radiance_chuilian_info": "一名角色受到伤害后，若该角色受到此伤害前未受伤，你可以摸一张牌，且若该角色不为你，你回复一点体力。",
                    "radiance_douyan": "斗艳",
                    "radiance_douyan_info": "出牌阶段限一次，你可以与一名其他角色拼点。若你赢，你直至回合结束你对该角色使用牌无距离限制，且你选择一项效果获得：1.其手牌对你可见，你可以将一张手牌当作【过河拆桥】对该角色使用；2.你使用牌指定该角色为目标后摸一张牌。若你没赢，该角色下个回合的弃牌阶段跳过。",
                    "radiance_douyan_1": "斗艳",
                    "radiance_douyan_2": "斗艳",
                    "radiance_douyan_3": "斗艳",
                    "radiance_huanxing": "幻形",
                    "radiance_huanxing_info": "若你手牌和装备区内的装备牌数不小于你总牌数的一半，你可以将一张装备牌当作任意基本牌或非延时类锦囊牌使用或打出。",
                    "radiance_huajian": "华剑",
                    "radiance_huajian_info": "当你使用【杀】或【决斗】指定目标后，你可以进行一次判定，然后目标角色展示手牌。若其有此花色的手牌，你获得这些牌；否则你获得判定牌，此【杀】或【决斗】对其造成的伤害+1。",
                    "radiance_yueyin": "月吟",
                    "radiance_yueyin_info": "当一名角色因弃置而失去牌后（不会嵌套此技能），若这些牌中包含红桃牌或装备牌，你可以弃置一张牌，然后令该角色以外的一名角色获得这些红桃和装备牌，其可以使用这些牌中的任意装备牌。",
                    "radiance_xianzhu": "贤助",
                    "radiance_xianzhu_info": "摸牌阶段，你可以放弃摸牌，改为令一名角色将其手牌补至体力上限（至多为5）；若其摸牌不超过三张，你摸一张牌。",
                    "radiance_gongqiao": "工巧",
                    "radiance_gongqiao_info": "一名其他角色使用【杀】造成伤害时，你可以展示并交给伤害来源一张手牌。若此牌为黑色，此伤害+1；若为红色，你回复一点体力。",
                    "radiance_lizhan": "历战",
                    "radiance_lizhan_info": "摸牌阶段，你可以放弃摸牌，改为展示牌堆顶的三张牌，并获得其中所有的非锦囊牌或所有锦囊牌；然后你可以将剩余的牌交给一名其他角色。当一张包含你为目标的伤害牌结算完毕后，你令你下一次“历战”展示的牌数+1。",
                    "radiance_nuyong": "怒勇",
                    "radiance_nuyong_info": "锁定技，当你使用一种类型的牌后，你使用【杀】的次数+1，与其他角色计算距离时-1，直至回合结束。",
                    "radiance_mingke": "铭刻",
                    "radiance_mingke_info": "出牌阶段限一次，你可以将一张黑色手牌当作你本局游戏中已经使用过的一张基本牌或非延时类锦囊牌使用。",
                    "radiance_kongzhi": "空值",
                    "radiance_kongzhi_info": "你的弃牌阶段结束时，若你有弃牌，你可以弃置其他角色区域内等量的牌；若你没有弃牌，你可以令一名其他角色弃置一张牌。",

                    "radiance_tuanjie": "团结",
                    "radiance_tuanjie_info": "出牌阶段限一次，你可以令所有角色依次选择将一张手牌交给其他角色并摸一张牌。",
                    "radiance_xisheng": "牺牲",
                    "radiance_xisheng_info": "当你受到伤害后，你可以选择至多X名伤害来源以外的角色，令伤害来源摸一张牌，你选择的角色各摸三张牌。（X为该伤害的点数）",
                    "radiance_ganzhao": "感召",
                    "radiance_ganzhao_info": "主公技，你的弃牌阶段开始时，若你需要弃牌，你可以令所有与你势力相同的其他角色依次选择是否弃置一张牌；若有角色弃牌，你的弃牌阶段跳过。",
                    "radiance_chayi": "察异",
                    "radiance_chayi_info": "摸牌阶段开始时，你可以令由你下家开始，所有角色依次摸一张牌然后弃一张牌。然后你需选择一项：1.放弃摸牌并获得这些弃牌中的X张；2.将本阶段的摸牌数改为X。（X为弃置的牌中的花色数）",
                    "radiance_biyou": "庇佑",
                    "radiance_biyou_info": "锁定技，你的回合外，当你使用或打出一张牌后，防止你受到所有的伤害直至回合结束。",
                    "radiance_huizhao": "辉照",
                    "radiance_huizhao_info": "准备阶段开始时，你可以选择一项：1.本回合的摸牌阶段所有角色依次摸一张牌，你于此阶段额外摸两张牌；2.本回合的结束阶段，你摸三张牌。",
                    "radiance_zhenjie": "贞洁",
                    "radiance_zhenjie_info": "当你成为其他角色的【杀】或非延时类锦囊牌的目标后，若此牌只有一个目标，你可以与使用者拼点。若你赢，此牌对你无效；若你没赢，你获得对方的拼点牌和以你为目标的牌。",
                    "radiance_dianlu": "典录",
                    "radiance_dianlu_info": "每回合限X次，当与你距离1或以内的角色使用或打出一张【闪】后，你可以摸一张牌。你与其他角色计算距离时-X。（X为你已损失的体力值且至少为1）",
                    "radiance_dizui": "涤罪",
                    "radiance_dizui_info": "你的回合外，当你失去一张牌后，你可以选择一名攻击范围内本回合未选择过的角色。该角色直至回合结束技能全部失效，且你令其打出一张【闪】。若不打出，其受到一点雷电伤害。（场上有角色濒死时伤害延后至濒死后结算）",
                    "radiance_suzheng": "肃正",
                    "radiance_suzheng_info": "一名其他角色的出牌阶段开始前，你可以令该角色选择一项：1.将一张与你的“肃正”牌花色均不同的手牌置于你的武将牌上；2.受到你造成的一点伤害，然后获得你的“肃正”牌并跳过出牌阶段和弃牌阶段，直至你的下一个回合开始你不能再发动“肃正”。准备阶段，你可以移去所有“肃正”牌。",
                    "radiance_xinxiang": "心象",
                    "radiance_xinxiang_info": "当你成为一张非延时类锦囊牌的目标后，你可以观看牌堆顶的两张牌并选择其中一张获得，然后将另一张牌置于牌堆顶。",
                    "radiance_haoai": "浩爱",
                    "radiance_haoai_info": "当一名角色受到伤害时，若你的体力值大于此伤害值，你可以失去等量的体力，防止该角色受到伤害直至回合结束，然后其摸等量的牌。",
                    "radiance_yangzhu": "仰祝",
                    "radiance_yangzhu_info": "出牌阶段限一次，你令所有技能发动时手牌比你多的角色依次选择一项：1.弃置一张手牌；2.令你摸一张牌。结算完毕后，若你的手牌为最多或之一，你结束出牌阶段。",
                    "radiance_youguo": "佑国",
                    "radiance_youguo_info": "主公技，锁定技，你的手牌上限+X；当你进行“仰祝”的手牌数统计时，X张手牌不计入你的手牌数。（X为场上其他与你势力相同的角色数）",
                    "radiance_kaicheng": "开诚",
                    "radiance_kaicheng_info": "出牌阶段开始时，你可以令所有其他角色选择一项：1.展示所有手牌，本回合其所有手牌对你可见；2.本回合不能使用或打出牌。",
                    "radiance_chuhai": "除害",
                    "radiance_chuhai_info": "出牌阶段限一次，你可以弃置一张牌，然后弃置一名其他角色至多两张牌。若其弃置的牌中颜色不超过一种，你视为对其使用了一张【杀】；若其因此【杀】受到伤害，其摸一张牌。",
                    "radiance_junheng": "均衡",
                    "radiance_junheng_info": "当你受到一点伤害后，你可以令一名角色将手牌调整至手牌上限。（至多摸/弃四张牌）",

                    "radiance_yingling": "英灵",
                    "radiance_yingling_info": "①当你造成伤害时，你可以弃置一张牌令此伤害+1，然后下一次发动时弃牌数+1；当你杀死角色后，重置此数值。<br>②当你受到伤害时，你可以弃置一张牌防止此伤害，然后下一次发动时弃牌数+1；当你受到伤害后，重置此数值。",
                    "radiance_tianshu": "天枢",
                    "radiance_tianshu_info": "锁定技，你的手牌上限至少为X。回合开始时，你将手牌摸至X张，然后若以此法摸牌数大于2，你跳过摸牌阶段。（X为场上最高的体力值且至少为2，至多为5）",
                    "radiance_huiwang": "辉望",
                    "radiance_huiwang_info": "每回合每名角色限一次（你则不限次数），当一名角色成为其以外的角色的伤害或失去牌效果的牌的目标后，若本回合内其成为这些牌目标的次数不小于其体力值，你可以摸一张牌，然后交给其一张牌。",

                    "radiance_tianxuan": "天璇",
                    "radiance_tianxuan_info": "当你进行判定前，你可以随机观看四种花色的牌各一张，选择其中一张牌并获得，此次判定结果视为此牌。",
                    "radiance_xianyue": "仙乐",
                    "radiance_xianyue_info": "出牌阶段开始时，你可以翻面，然后获得以下效果直至下回合开始：<br>1.每名角色限一次，你的武将牌为正面朝上，当其造成伤害时，你可以令其判定：若结果为黑色，此伤害+1；否则你摸一张牌；<br>2.每名角色限一次，你的武将牌为背面朝上，当其受到伤害时，你可以令其判定。若结果为红色，此伤害+1；否则你摸一张牌。<br>若你为进行判定的角色且结果为摸牌时，改为摸两张牌。",
                    "radiance_yunming": "运命",
                    "radiance_yunming_info": "一名角色的判定牌生效前，你可以打出一张黑色牌。若如此做，你选择此判定结果的点数和花色。",
                    "radiance_tianze": "天择",
                    "radiance_tianze_info": "出牌阶段限一次，你选择顺时针或逆时针，由你开始，按此顺序所有角色依次弃置一张点数比上一张牌大的手牌，直至有角色不如此做或所有角色均已弃置；若有其他角色不如此做，你可以选择一项：1.对该角色造成一点伤害；2.获得其他角色因此弃置的所有牌。",
                    "radiance_qiongguang": "穹光",
                    "radiance_qiongguang_info": "出牌阶段，你可以弃置一张手牌并展示牌堆顶两张牌。若这两张牌的点数互质，你选择一名其他角色，将这两张牌任意分配给你和该角色，然后你对其造成一点伤害；否则你令一名角色获得这两张牌。若你弃置的牌的点数不为质数或一名角色本阶段以此法获得至少两张牌后，此技能本阶段失效。",
                    "radiance_tianji": "天玑",
                    "radiance_tianji_info": "当你成为一张其他角色的牌的目标时，你可以失去一点体力取消此目标，此牌对你无效。当你失去一点体力后，可以选择比7大或小。你持续展示并获得牌堆顶的牌，直至出现符合条件的牌。",

                    "radiance_xianyi": "仙衣",
                    "radiance_xianyi_info": "锁定技，当你的体力值变化后，若这是本局游戏中你的体力值第一次变为该值，你摸两张牌并回复一点体力。",
                    "radiance_quhai": "去害",
                    "radiance_quhai_info": "出牌阶段，你可以选择一名装备区内有武器的角色，令其选择一项：1.弃置装备区内的武器牌并摸X张牌；2.失去一点体力，然后此技能本阶段失效。（X为你本回合此前已发动“去害”的次数，至多为4）",
                    "radiance_heyu": "鹤羽",
                    "radiance_heyu_info": "当一名角色成为其他角色的【杀】或非延时类的锦囊牌的唯一目标后，你可以令该牌对目标角色无效，然后你持续展示牌堆顶的牌，直至出现与已有的【鹤羽】牌花色均不同的牌。你获得这些牌，然后将一张与【鹤羽】牌花色均不同的手牌置于武将牌上。若展示的牌数不为两张，你失去一点体力。",
                    "radiance_xianci": "仙赐",
                    "radiance_xianci_info": "锁定技，你武将牌上每有一张【鹤羽】牌，其他角色计算与你的距离时+1，你的手牌上限+1。你可以将两张颜色相同的【鹤羽】牌当作【桃】使用。",

                    "radiance_siqi": "死气",
                    "radiance_siqi_info": "当一名角色脱离濒死后，你可以摸一张牌。",
                    "radiance_hunduan": "魂断",
                    "radiance_hunduan_info": "出牌阶段开始时，你可以弃置一张黑色牌。若如此做，直至回合结束，除你以外的所有角色技能失效，不能获得牌，非濒死状态不能使用或打出牌。",
                    "radiance_hunduan_db": "魂断",
                    "radiance_yindun": "隐遁",
                    "radiance_yindun_info": "锁定技，你不会成为【南蛮入侵】、【万箭齐发】和【闪电】的目标；当一张【南蛮入侵】或【万箭齐发】结算完毕后，你回复一点体力。",
                    "radiance_huoshi": "祸世",
                    "radiance_huoshi_info": "出牌阶段限一次，你可以选择所有体力值不大于你或不小于你的角色，你与这些角色各失去一点体力。",
                    "radiance_jiguang": "极光",
                    "radiance_jiguang_info": "每回合限一次，你可以视为使用或打出了一张未以此法选择过的任意基本牌或者非延时类锦囊牌；以此法使用的牌无距离限制。",
                    "radiance_tianquan": "天权",
                    "radiance_tianquan_info": "你的回合结束时，你可以摸一张牌，且若你体力值为全场最低，改为回复一点体力或摸两张牌；然后你可以恢复一个“极光”已用牌名。",
                    "radiance_jimie": "迹灭",
                    "radiance_jimie_info": "觉醒技，你的回合开始时，若“极光”没有可以使用或打出的牌，你所在的阵营获得游戏胜利。",
                    "radiance_cancun": "残存",
                    "radiance_cancun_info": "出牌阶段限一次，你可以弃置一张手牌，然后亮出牌堆顶3+2X张牌，选择并获得亮出的牌中至多三张点数不大于你弃置的牌的牌或至多三张点数不小于你弃置的牌的牌。（X为你已失去的体力值）",
                    "radiance_shangyu": "殇羽",
                    "radiance_shangyu_info": "锁定技，游戏开始时，你获得两个“羽”标记；当你脱离濒死时，获得一个“羽”标记。你每有一个“羽”，手牌上限+1；当你受到伤害时，你移除一个“羽”并防止此伤害，然后伤害来源随机弃置一张牌。",
                    "radiance_wenyi": "瘟疫",
                    "radiance_wenyi_info": "一名其他角色回复体力后，你记录其，然后可以令其弃置一张牌；你的结束阶段开始时，你可以对一名记录过的角色造成一点伤害，然后清空所有记录。",
                    "radiance_yujia": "驭假",
                    "radiance_yujia_info": "当你需要使用或打出一张【杀】，【闪】或者【无懈可击】时，可以将一张牌当作之使用。若如此作，你获得一个“假”标记。有“假”标记的人角色视为拥有技能“侵蚀”。",
                    "radiance_jiayi": "嫁移",
                    "radiance_jiayi_info": "当你受到一点伤害后，可以将一个“假”标记移给伤害来源，然后摸一张牌。场上每有一名其他角色有“假”标记，你摸牌阶段额外摸一张牌，手牌上限+1。",
                    "radiance_qinshi": "侵蚀",
                    "radiance_qinshi_info": "锁定技，你的结束阶段，若场上没有角色拥有技能“驭假”，或你有至少两个“假”标记，你移除所有“假”标记，然后失去一点体力。若你拥有技能“驭假”，改为至少四个标记，且你先摸两张牌再失去体力。",
                    "radiance_moxiang": "魔香",
                    "radiance_moxiang_info": "出牌阶段限一次，你令一名其他角色选择一项：1.弃置两张手牌并回复一点体力，然后在其下一个结束阶段失去一点体力；2.失去一点体力并摸两张牌，然后在其下一个结束阶段随机弃置两张牌。",
                    "radiance_moxiang_gl": "魔香",
                    "radiance_zaichun": "再春",
                    "radiance_zaichun_info": "当你成为一名其他角色的【杀】或者非延时类锦囊牌的目标后，可以令此牌的使用者弃置你一张手牌，则你在此牌结算完毕后将手牌摸至四张。",
                    "radiance_zhuisi": "追死",
                    "radiance_zhuisi_info": "当一名角色闪避了【杀】后，你可以与该角色拼点。若你赢，此【杀】仍然命中。",
                    "radiance_nanming": "难命",
                    "radiance_nanming_info": "当你进行拼点时，若你的攻击范围大于该角色，你视为赢（点数为14）；当你拼点前，可以摸一张牌。",
                    "radiance_huisheng": "回生",
                    "radiance_huisheng_info": "锁定技，游戏开始时，你获得一个“生”标记；你受到伤害时，取消之并获得等量的“生”标记。你的结束阶段，你移除X-1个“生”标记，失去等量的体力并获得等量的【杀】。出牌阶段你可以额外使用X张杀。（X为你的“生”标记数）",
                    "radiance_yuanhun": "怨魂",
                    "radiance_yuanhun_info": "若你有“生”标记，你可以令你的【杀】根据花色得到下列效果：·红桃：伤害+X ·方片：使用时你摸X张牌 ·草花：攻击范围+X且需额外使用X张【闪】才能抵消 ·黑桃：造成伤害后移除一个“生”标记。（X为你的“生”标记数）",


                    "radiance_jiaoyan": "娇艳",
                    "radiance_jiaoyan_info": "出牌阶段，若你本阶段没有造成过伤害，你可以选择一名其他角色，交给其一张伤害牌，然后其选择一项：1.对另一名你选择的角色使用一张【杀】（无距离限制，伤害来源视为你），然后你可以观看并获得其一张非伤害牌；2.将手牌补至四张并翻面。结束阶段，若你本回合使用“娇艳”的次数大于1，你失去一点体力。",
                    "radiance_tianhua": "天华",
                    "radiance_tianhua_info": "锁定技，游戏开始时/你失去体力后，你获得两个/等量“华”标记。防止你每回合受到的第一次由其他角色的牌造成的伤害，然后你失去一点体力并重置。你与其他角色的距离-X，其他角色与你的距离+X，你的手牌上限+X；回合结束时，你摸X张牌，然后移去一个“华”。（X为“华”标记数）",
                    "radiance_diewu": "蝶舞",
                    "radiance_diewu_info": "一名男性角色的出牌阶段开始时，你可以摸一张牌，然后其本回合【杀】的次数上限+1，手牌上限-1。",
                    "radiance_diewu_af": "蝶舞",
                    "radiance_fengying": "风影",
                    "radiance_fengying_info": "准备阶段或当你受到伤害后，若你手牌数多于体力值，你可以将超出的部分交给一名其他角色或弃置，然后回复一点体力。若你未恢复体力，你可以切换“蝶舞”的性别选项。",

                    "radiance_danda": "荆棘",
                    "radiance_danda_info": "你的回合外，当一名角色成为【杀】的目标时，若你也在来源的攻击范围内，你可以从手牌打出一张基本牌，令来源选择一项：1.打出一张【闪】并令此【杀】对目标角色无效；2.根据你打出的牌执行后续效果：【杀】：来源受到两点冰属性伤害；【闪】：你获得来源一张牌和此【杀】的实体牌；其他：你与目标角色各摸两张牌。",
                    "radiance_fenqi": "绽放",
                    "radiance_fenqi_info": "限定技，出牌阶段，你展示牌堆顶五张牌，若这些牌中没有【杀】，则你继续展示牌堆顶的牌；直至展示的牌中有【杀】为止，你获得这些牌，这些牌本回合不计入手牌上限，你本回合使用【杀】没有距离限制。",
                    "radiance_fenqi_af": "绽放",
                    "radiance_yidai": "依代",
                    "radiance_yidai_info": "锁定技，你的攻击范围-1。杀死你的角色获得“依代”。",
                    "radiance_renlin": "刃林",
                    "radiance_renlin_info": "游戏开始时，你可以随机使用一张武器牌。其他角色的武器牌进入弃牌堆后，你可以获得之。你的武器牌不计入手牌上限。限定技，当一名角色进入濒死状态时，你可以重铸任意张武器牌，然后该角色回复等量的体力。",
                    "radiance_jianxing": "剑醒",
                    "radiance_jianxing_info": "出牌阶段每项各限一次，你选择一张武器牌：1.弃置之并对一名其他角色造成一点伤害；2.弃置之并令一名角色回复一点体力；3.令一名没有装备武器牌的其他角色装备之；4.将之置于牌堆顶，然后令一名角色复原武将牌。",
                    "radiance_tenglong": "腾龙",
                    "radiance_tenglong_info": "其他角色的出牌阶段开始时，你可以对该角色或其上下家使用一张【杀】。若如此做，你摸一张牌，其他角色与你计算距离时+1，直至回合结束。你使用【杀】时无视目标角色的防具。",
                    "radiance_tenglong_af": "腾龙",
                    "radiance_tenglong_sha_db": "腾龙",
                    "radiance_juesha": "绝杀",
                    "radiance_juesha_info": "限定技，一名角色濒死时，你可以摸三张牌，令该角色需要的回复量+1，然后你修改“腾龙”。",

                    "radiance_gongfa": "共伐",
                    "radiance_gongfa_info": "锁定技，当一名角色使用【杀】指定目标时，若你没有装备防具，在其攻击范围内且你不是此【杀】的目标，你摸一张牌并额外成为此【杀】的目标。",
                    "radiance_baohui": "暴毁",
                    "radiance_baohui_info": "当一张草花【杀】结算完毕后，若你是目标之一，你可以获得之；你使用草花【杀】没有次数限制。",
                    "radiance_pangran": "庞然",
                    "radiance_pangran_info": "锁定技，你不能使用【闪】。出牌阶段，你可以弃置任意数量的【闪】，然后摸等量的牌。",
                    "radiance_mengdu": "猛毒",
                    "radiance_mengdu_info": "出牌阶段限一次，你可以令一名有手牌的其他角色展示所有手牌。若其有【杀】或【闪】，其需选择一项：1.弃置所有【杀】和【闪】；2.失去一点体力。",
                    "radiance_weihao": "危号",
                    "radiance_weihao_info": "锁定技，你每回合使用的第一张【杀】指定所有其他角色为目标；此你【杀】命中后，你摸一张牌；此【杀】结算完毕后，若造成过伤害，你失去一点体力。",

                    "radiance_weiyong": "威勇",
                    "radiance_weiyong_info": "①锁定技，你与其他角色计算距离时-1；你使用的【杀】需要额外使用一张【闪】才能闪避。②一名其他角色的出牌阶段开始时，你可以交给其一张手牌，令其获得“威勇”的①效果直至回合结束。",
                    "radiance_weiyong_give": "威勇",
                    "radiance_weiyong_give_info": "锁定技，你与其他角色的距离-1，其他角色与你的距离+1；你使用的【杀】需要额外使用一张【闪】才能闪避。",
                    "radiance_yingzhi": "英知",
                    "radiance_yingzhi_info": "每轮每名角色限一次，一名角色被【杀】命中后，你可以摸一张牌；若此【杀】的使用者拥有“威勇”的效果，改为摸两张牌。",
                    "radiance_chilie": "炽烈",
                    "radiance_chilie_info": "锁定技，准备阶段，你摸三张牌；你跳过判定阶段；结束阶段，你失去一点体力。你使用牌无距离限制，【杀】的次数上限+1，手牌上限无限。",
                    "radiance_yaoguang": "摇光",
                    "radiance_yaoguang_info": "每种牌名限一次，当你使用或打出一张基本牌后，可以摸一张牌。当你的体力值变化后，重置此技能。",
                    "radiance_bengyao": "崩曜",
                    "radiance_bengyao_info": "锁定技，杀死你的角色每个回合结束后受到1点无来源的火焰伤害。",
                    "radiance_bengyao_db": "崩曜",
                    "radiance_yingxue": "映血",
                    "radiance_yingxue_info": "你的准备阶段、当你造成或受到一点伤害后，可以选择一项：1.摸一张牌；2.获得一个“血”标记。你每有一个“血”标记，你与其他角色计算距离-1，【杀】的次数上限+1；你的结束阶段，你移除所有“血”标记并摸等量的牌。",
                    "radiance_zhoufa": "咒罚",
                    "radiance_zhoufa_info": "锁定技，当你死亡时，将一张【闪电】置于杀死你的角色的判定区内。本局游戏中，该角色的【闪电】判定必中。",
                    "radiance_zhoufa_db": "咒罚",
                    "radiance_zhanque": "斩却",
                    "radiance_zhanque_info": "当你使用【杀】指定目标后，你可以令目标选择一名其以外的角色，该角色选择是否打出一张【闪】。若不打出，目标角色不能使用【闪】响应此【杀】且此【杀】对其伤害+1。",
                    "radiance_xiangyun": "祥云",
                    "radiance_xiangyun_info": "当你使用或打出红桃牌时，或当你成为红桃牌的目标后，可以摸一张牌；你的红桃牌不计入手牌上限。",

                    "radiance_baiyi": "百艺",
                    "radiance_baiyi_info": "出牌阶段限一次，你可以弃置任意张手牌并令一名其他角色选择一项：1.弃置两倍的手牌；2.受到1点伤害，然后你摸等量的牌。",
                    "radiance_fengxing": "风行",
                    "radiance_fengxing_info": "当你成为一张【杀】的目标时，你可以失去1点体力取消之，然后你亮出牌堆顶的两张牌并令此牌的使用者选择一项：1.弃置一张点数在这两张牌的点数所构成的闭区间之内的手牌并令你获得这两张牌；2.你回复一点体力。",
                    "radiance_wanxiang": "万象",
                    "radiance_wanxiang_info": "出牌阶段开始时，你可以与一名其他角色拼点。若你赢，视为你使用了任意一张非延时类锦囊牌（无距离限制）；若你没赢，你获得对方的拼点牌，不能使用锦囊牌且锦囊牌不计入手牌上限，直至回合结束。",
                    "radiance_wanxiang_db": "万象",
                    "radiance_qiongjiu": "穷究",
                    "radiance_qiongjiu_info": "当你成为其他角色的【杀】或非延时类的锦囊牌的目标后，你可以失去一点体力，令该牌对你无效。然后你可以将一张牌置于弃牌堆并从弃牌堆中获得一张点数为该牌倍数或因数的牌。",

                    "radiance_chenji": "沉寂",
                    "radiance_chenji_info": "出牌阶段，你可以弃置一张黑色手牌，然后选择一名角色，令其获得一个“沉寂”标记。有“沉寂”标记的角色所有技能失效，每个其的回合结束后移除一个“沉寂”标记。你于一个回合内以此法弃置的牌花色需相同。",
                    "radiance_chenji_disable": "沉寂",

                    "radiance_zhaoyao": "招摇",
                    "radiance_zhaoyao_info": "出牌阶段开始前，你可以摸至多三张牌。然后若你的手牌为全场唯一最多，你需选择一项：1.失去一点体力；2.此阶段的自由时点只能使用一张牌。",
                    "radiance_jianshang": "奸商",
                    "radiance_jianshang_info": "弃牌阶段结束时，你可以选择一名其他角色和你于此阶段的任意张位于弃牌堆的弃牌，该角色选择一项：1.将等量的手牌交给你然后获得你选择的牌；2.失去一点体力，然后获得你本阶段弃置的其他位于弃牌堆的牌。",
                    "radiance_baoji": "暴击",
                    "radiance_baoji_info": "当你使用【杀】或【决斗】造成伤害时，可以进行一次判定。若判定结果为黑色，或在判定结果为红色时你选择失去一点体力，则此伤害+1。",
                    "radiance_jiabei": "加倍",
                    "radiance_jiabei_info": "当你要因为摸牌而获得牌前，可以声明一个颜色/花色。若这次你将要获得的牌中有此颜色/花色，你额外摸一/两张牌。",

                    "radiance_wenyu": "温愈",
                    "radiance_wenyu_info": "出牌阶段，你可以选择一名已受伤的角色并弃置X张牌，令该角色回复一点体力。然后你进行一次判定。若不为红桃，该角色的X值+1；若为黑色，此技能本阶段失效。一名角色濒死时，其X值-1。（X基础值为2，至少为1）",
                    "radiance_piaoling": "飘零",
                    "radiance_piaoling_info": "当你进行判定后，摸一张牌；若结果为黑桃，改为摸三张牌。",
                    "radiance_zaowu": "造物",
                    "radiance_zaowu_info": "出牌阶段，你可以将一张手牌当作【无中生有】使用。若你以此法使用的牌花色不为草花或点数小于本阶段已以此法使用过的牌，此技能本阶段失效。",
                    "radiance_sanyuan": "三元",
                    "radiance_sanyuan_info": "你使用无属性【杀】时，可以为其赋予属性；你使用原本有属性的【杀】时，无距离、次数限制且不计入使用次数。若你没有防具，防止你受到属性伤害。",
                    "radiance_yunjian": "云剑",
                    "radiance_yunjian_info": "你可以将一张非基本牌当作【杀】使用或打出。以此法使用的【杀】无距离、次数限制且不计入使用次数；你以此法使用了牌后，直至回合结束你的攻击范围无限。",
                    "radiance_yunjian_af": "云剑",
                    "radiance_leiyin": "雷引",
                    "radiance_leiyin_info": "出牌阶段结束时，若你本回合造成过的伤害小于你本回合使用过的伤害牌数，你可以弃置至多X张手牌并对一名其他角色造成等量的雷电伤害。（X为那个差值且至多为3）",

                    "radiance_caishe": "裁设",
                    "radiance_caishe_info": "游戏开始时、你的回合开始前和结束后，你可以选择一名其他角色并选择该角色的一个非觉醒技、使命技、主公技的技能获得（同时最多拥有一个）。只要你以此法获得了技能，原本拥有者的那个技能便失效。原本拥有者死亡时，你需重新进行选择。",
                    "radiance_caishe_disable": "裁设",
                    "radiance_jixing": "极星",
                    "radiance_jixing_info": "锁定技，牌堆顶的七张牌对你可见；你不会被翻面或受到无对应非转换实体牌的伤害。",
                },
            },
            intro: "原创世界观，目前人设剧情只有一个大概也没有下笔，因为作者高中语文不及格。</br>卡图大部分都是各种游戏里的，不妨数一数你认识其中多少个？</br>交流群号815451309，关于武将强度过强/过弱、弹窗、效果与描述不符合或其他问题请加群反馈，亦欢迎对代码、武将设计有兴趣的玩家。",
            author: "水天一色",
            diskURL: "",
            forumURL: "",
            version: "1.0.0",
        },
        files: {
            "character": [],
            "card": [],
            "skill": []
        }
    }
})