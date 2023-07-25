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
            lib.translate.radiance_group_free = '人';
            lib.translate.radiance_group_free2 = '人';
            lib.groupnature.radiance_group_free = 'radiance_group_free';


            // 滴炎尘气耀暮
            // Pack
            var radiance_pack = {
                character: {
                    "radiance_ma004_Watersky": ["female", "radiance_group_magic", 3, ["radiance_zhisu", "radiance_guiji"],
                        []
                    ],
                    "radiance_un004_reine": ["female", "radiance_group_union", 3, ["radiance_kongyin", "radiance_chuilian"],
                        []
                    ],
                    "radiance_ch004_waterSky": ["female", "radiance_group_church", 3, ["radiance_chalu", "radiance_dizui"],
                        []
                    ],
                    "radiance_hv001_reine": ["female", "radiance_group_heaven", 3, ["radiance_tianxuan", "radiance_xianyue"],
                        []
                    ],
                },
                characterSort: {
                    "mode_extension_星耀璨然": {
                        "radiance_magic": [
                            "radiance_ma004_Watersky"
                        ],
                        "radiance_heng": [],
                        "radiance_union": [
                            "radiance_un004_reine",
                        ],
                        "radiance_church": [
                            "radiance_ch004_waterSky"
                        ],
                        "radiance_heaven": [
                            "radiance_hv001_reine",
                        ],
                        "radiance_underworld": [],
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
                    "radiance_underworld": "下界",
                    "radiance_free": "散人",

                    "radiance_ma004_Watersky": "白泽水天",
                    "radiance_ch004_waterSky": "白泽水天",
                    "radiance_un004_reine": "怜音",
                    "radiance_hv001_reine": "怜音",
                    "radiance_000_infinity": "水天一色",
                },
                characterTitle: {
                    "radiance_ma004_Watersky": "平衡者",

                    "radiance_un004_reine": "坠天之羽",
                    "radiance_ch004_waterSky": "记录者",

                    "radiance_hv001_reine": "悯天使",

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
                        init: function(player) {
                            game.log(player, '获得了', 'radiance_wudi');
                        },
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
                            var cards = get.cards(Math.max(1, player.getDamagedHp()));
                            event.cards = cards.slice(0);
                            game.cardsGotoOrdering(cards);
                            var dialog = ui.create.dialog("质素");
                            dialog.add("请选择要获得的牌，没获得的点数为1或质数的牌可以造成伤害");
                            dialog.add(cards, 'cards');
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
                                player.damage(result.targets[0], cards.length, 'nocard');
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
                                target.gain(cards, player, 'giveAuto');
                            } else {
                                player.addTempSkill('radiance_kongyin_u1', 'phaseUseEnd');
                                player.discard(cards);
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

                    // church
                    "radiance_chalu": {
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
                                event.target.judge();
                            } else {
                                event.finish();
                            }
                            'step 4'
                            if (result.color == 'black' || event.target.hasSkillTag('forbid_card')) {
                                var next;
                                var evt = _status.event.getParent('dying', true);
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
                            } else {
                                event.target.addTempSkill('radiance_forbid');
                            }
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
                            for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                                var currentcard = ui.cardPile.childNodes[i];
                                if (get.info(currentcard).vanish || currentcard.storage.vanish) {
                                    currentcard.remove();
                                    continue;
                                }
                                cards.push(currentcard);
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
                        init: function(player, skill) {
                            if (!Array.isArray(player.storage.radiance_xianyue_add)) player.storage.radiance_xianyue_add = [];
                            if (!Array.isArray(player.storage.radiance_xianyue_minus)) player.storage.radiance_xianyue_minus = [];
                            if (!player.hasSkill('radiance_xianyue_clear')) player.addTempSkill('radiance_xianyue_clear', {
                                player: 'phaseBegin',
                            });
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
                                        if (player.isTurnedOver() && player.storage.radiance_xianyue_add && player.storage.radiance_xianyue_add.length > 0) {
                                            dialog.addText("已对下列角色发动过为来源时的效果");
                                            dialog.addSmall(player.storage.radiance_xianyue_add);
                                        } else if (!player.isTurnedOver() && player.storage.radiance_xianyue_minus && player.storage.radiance_xianyue_minus.length > 0) {
                                            dialog.addText("已对下列角色发动过受伤时的效果");
                                            dialog.addSmall(player.storage.radiance_xianyue_minus);
                                        } else {
                                            return "生效中";
                                        };
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
                },
                translate: {
                    "radiance_zhisu": "质素",
                    "radiance_zhisu_info": "出牌阶段限一次，你观看牌堆顶的X张牌，然后选择获得这些牌中的任意牌；若剩余的牌中有点数为1、2、3、5、7、9、J、K的牌，你可以对一名其他角色造成等量的伤害。（X为你已失去的体力值且至少为1）",
                    "radiance_guiji": "轨迹",
                    "radiance_guiji_info": "当一名角色使用牌指定你为目标时，你可以令此牌对你无效并令一名其他角色代替你成为此牌的目标；若此牌不为伤害牌或目标数大于1，你摸两张牌。最后你失去一点体力。",
                    "radiance_kongyin": "空音",
                    "radiance_kongyin_info": "出牌阶段每项各限一次：1.将一张手牌交给一名其他角色，令其失去一点体力；2.弃置至少两张花色各不同的手牌，令一名其他角色摸X张牌并翻面。（X为4减去弃置的牌数）",
                    "radiance_chuilian": "垂怜",
                    "radiance_chuilian_info": "一名角色受到伤害后，若该角色受到此伤害前未受伤，你可以摸一张牌。",

                    "radiance_chalu": "察录",
                    "radiance_chalu_info": "当你或一名在你攻击范围内的角色使用或打出一张【闪】后，你可以摸一张牌。",
                    "radiance_dizui": "涤罪",
                    "radiance_dizui_info": "你的回合外，当你失去一张牌后，你可以选择一名与你距离1或以内的角色。该角色直至回合结束技能全部失效，且你令其打出一张【闪】，否则其进行一次判定。若结果为红色，其直至回合结束不能使用或打出牌；若为黑色或其已经不能使用或打出牌，其受到一点雷电伤害。你与其他角色计算距离时-X。（X为你已损失的体力值；场上有角色濒死时伤害延后至濒死后结算）",

                    "radiance_tianxuan": "天璇",
                    "radiance_tianxuan_info": "当你进行判定前，你从牌堆中选择一张牌并获得，此次判定结果视为此牌。",
                    "radiance_xianyue": "仙乐",
                    "radiance_xianyue_info": "出牌阶段开始时，你可以翻面，然后获得以下效果直至下回合开始：1.你的武将牌为正面朝上时每名角色限一次，当其造成伤害时，你可以令其判定。若结果为黑色，此伤害+1；否则你摸一张牌；2.你的武将牌为背面朝上时每名角色限一次，当其受到伤害时，你可以令其判定。若结果为红色，此伤害+1；否则你摸一张牌。当你为进行判定的角色且结果为摸牌时，额外摸一张牌。",
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