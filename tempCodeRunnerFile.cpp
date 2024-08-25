#include <bits/stdc++.h>
using namespace std;

bool reverse(int x, int y) {
    if (x == y)
        return true;
    string s1 = to_string(x);
    string s2 = to_string(y);
    for (int i = 0; i < s2.size() - 1; i++) {
        for (int j = i + 1; j < s2.size(); j++) {
            swap(s2[i], s2[j]);
            int num1 = stoi(s1), num2 = stoi(s2);
            if (num1 == num2)
                return true;
            swap(s2[i], s2[j]);
        }
    }
    for (int i = 0; i < s1.size() - 1; i++) {
        for (int j = i + 1; j < s1.size(); j++) {
            swap(s1[i], s1[j]);
            int num1 = stoi(s1), num2 = stoi(s2);
            if (num1 == num2)
                return true;
            swap(s1[i], s1[j]);
        }
    }
    return false;
}

    int countPairs(vector<int>& nums) {
        int count = 0;
        for (int i = 0; i < nums.size() - 1; i++)
            for (int j = i + 1; j < nums.size(); j++){
                if (reverse(nums[i], nums[j])){
                    cout << nums[i] << " " << nums[j] << endl;
                    count++;
                }
            }

        return count;
    }
int main() {
    vector<int> nums = {5,12,8,5,5,1,20,3,10,10,5,5,5,5,1};
    cout << countPairs(nums) << endl;
    return 0;
}