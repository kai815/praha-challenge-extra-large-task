@startuml
left to right direction

actor "作業者" as ac
rectangle "参加者" as Menbers {
usecase "一覧取得(getMenbersIndex)" as gmi
usecase "新規追加(addMenber)" as am
usecase "更新(updaeMenber)" as um
note right of (um)
少なくとも在籍ステータスを変更できる
end note
usecase "削除(removeMenber)" as rm
usecase "検索(searchMenber)" as sm
note right of (sm)
特定の課題（複数可能）」が
「特定の進捗ステータス」
になっている参加者の一覧を、
10 人単位でページングして取得する
end note
}
ac --> gmi
ac --> am
ac --> um
ac --> rm
ac --> sm

rectangle "チーム" as teams {
usecase "一覧取得(getTeamsIndex)" as gti
usecase "更新(updaeTeam)" as ut
note right of (ut)
少なくとも所属するペアを変更できる
end note
}
ac --> gti
ac --> ut

rectangle "ペア" as pair {
usecase "一覧取得(getPairsIndex)" as gpi
usecase "更新(updaePair)" as up
note right of (up)
少なくとも所属する参加者を変更できる
end note
}
ac --> gpi
ac --> up

rectangle "課題" as task {
usecase "新規追加(addTask)" as at
usecase "更新(updaeTask)" as uta
note right of (uta)
少なくとも進捗ステータスを変更できる
end note
usecase "削除(removeTask)" as rt
}
ac --> at
ac --> uta
ac --> rt

@enduml
